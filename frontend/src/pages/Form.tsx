import { useEffect, useState } from "react";
import {
  getVehicleModels,
  getVehicleTypes,
  submitBooking,
} from "../services/api";
import {Button, TextField ,RadioButton, DateInput} from "../components/formComponents"

export default function VehicleBookingForm() {
  // Steps
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState<any>([]);
  const [vehicleModels, setVehicleModels] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
  });

  // Form errors
  const [errors, setErrors] = useState<any>({});

  const steps = [
    "Personal Information",
    "Number of Wheels",
    "Vehicle Type",
    "Vehicle Model",
    "Booking Dates",
  ];

  useEffect(() => {
    if (formData.wheels) {
      setLoading(true);
      getVehicleTypes(formData.wheels)
        .then((data) => {
          setVehicleTypes(data);
          // Reset vehicle type and model if wheels change
          setFormData((prev) => ({
            ...prev,
            vehicleType: "",
            vehicleModel: "",
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [formData.wheels]);

  useEffect(() => {
    if (formData.vehicleType) {
      setLoading(true);
      getVehicleModels(formData.vehicleType)
        .then((data) => {
          setVehicleModels(data);
          // Reset vehicle model if type changes
          setFormData((prev) => ({
            ...prev,
            vehicleModel: "",
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [formData.vehicleType]);

  const validateStep = (step: any) => {
    let newErrors: any = {};
    let isValid = true;

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }
        break;
      case 1: // Number of Wheels
        if (!formData.wheels) {
          newErrors.wheels = "Please select number of wheels";
          isValid = false;
        }
        break;
      case 2: // Vehicle Type
        if (!formData.vehicleType) {
          newErrors.vehicleType = "Please select a vehicle type";
          isValid = false;
        }
        break;
      case 3: // Vehicle Model
        if (!formData.vehicleModel) {
          newErrors.vehicleModel = "Please select a vehicle model";
          isValid = false;
        }
        break;
      case 4: // Booking Dates
        if (!formData.startDate) {
          newErrors.startDate = "Start date is required";
          isValid = false;
        }
        if (!formData.endDate) {
          newErrors.endDate = "End date is required";
          isValid = false;
        } else if (
          formData.startDate &&
          formData.endDate &&
          new Date(formData.endDate) <= new Date(formData.startDate)
        ) {
          newErrors.endDate = "End date must be after start date";
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field changes
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const onNextClick = () => {
    const isValid = validateStep(activeStep);

    if (isValid) {
      if (activeStep === steps.length - 1) {
        // Submit the form
        onSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result: any = await submitBooking(formData);
      setSubmitSuccess(result);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitSuccess({
        success: false,
        error: "Failed to submit booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      wheels: "",
      vehicleType: "",
      vehicleModel: "",
      startDate: "",
      endDate: "",
    });
    setErrors({});
    setActiveStep(0);
    setSubmitSuccess(null);
  };

  const renderStepContent = (step: number) => {
    const today = new Date().toISOString().split("T")[0];

    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">What is your name?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e:any) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e:any) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Number of wheels?</h2>
            <div>
              <div className="mb-4">
                <RadioButton
                  id="wheels-2"
                  name="wheels"
                  value="2"
                  label="2 Wheels"
                  checked={formData.wheels === "2"}
                  onChange={() => handleChange("wheels", "2")}
                />
                <RadioButton
                  id="wheels-4"
                  name="wheels"
                  value="4"
                  label="4 Wheels"
                  checked={formData.wheels === "4"}
                  onChange={() => handleChange("wheels", "4")}
                />
              </div>
              {errors.wheels && (
                <p className="text-red-500 text-xs italic">{errors.wheels}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Type of vehicle?</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div>
                <div className="space-y-2">
                  {vehicleTypes.map((type: any) => (
                    <RadioButton
                      key={type.id}
                      id={`vehicle-type-${type.id}`}
                      name="vehicleType"
                      value={type.id.toString()}
                      label={type.type}
                      checked={formData.vehicleType === type.id.toString()}
                      onChange={() =>
                        handleChange("vehicleType", type.id.toString())
                      }
                    />
                  ))}
                </div>
                {errors.vehicleType && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.vehicleType}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Specific model?</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div>
                <div className="space-y-2">
                  {vehicleModels.map((model: any) => (
                    <RadioButton
                      key={model.id}
                      id={`vehicle-model-${model.id}`}
                      name="vehicleModel"
                      value={model.id.toString()}
                      label={model.name}
                      checked={formData.vehicleModel === model.id.toString()}
                      onChange={() =>
                        handleChange("vehicleModel", model.id.toString())
                      }
                    />
                  ))}
                </div>
                {errors.vehicleModel && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.vehicleModel}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Select booking dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                label="Start Date"
                value={formData.startDate}
                onChange={(e: any) => handleChange("startDate", e.target.value)}
                error={errors.startDate}
                min={today}
              />
              <DateInput
                label="End Date"
                value={formData.endDate}
                onChange={(e: any) => handleChange("endDate", e.target.value)}
                error={errors.endDate}
                min={formData.startDate || today}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  //After Submit 
  if (submitSuccess !== null) {
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl mx-auto mt-12">
        {submitSuccess.success ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Booking Successful!
            </h2>
            <p className="mb-4">
              Thank you for your booking. Your booking ID is{" "}
              <strong>{submitSuccess.bookingId}</strong>.
            </p>
            <p className="mb-6">
              You will receive a confirmation email shortly with all the
              details.
            </p>
            <Button onClick={resetForm}>Book Another Vehicle</Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-600">Booking Failed</h2>
            <p className="mb-4">{submitSuccess.error}</p>
            <Button onClick={() => setSubmitSuccess(null)}>Try Again</Button>
          </div>
        )}
      </div>
    );
  }

  // Stepper
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl mx-auto mt-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  activeStep === index
                    ? "bg-blue-500 text-white"
                    : activeStep > index
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {activeStep > index ? "✓" : index + 1}
              </div>
              <div className="text-xs mt-1 text-center">{label}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute left-0 right-0 h-1 bg-gray-200 top-0"></div>
          <div
            className="absolute left-0 h-1 bg-blue-500 top-0"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-8">
        {renderStepContent(activeStep)}

        <div className="flex justify-end mt-8">
          <Button onClick={onNextClick} disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : activeStep === steps.length - 1 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
