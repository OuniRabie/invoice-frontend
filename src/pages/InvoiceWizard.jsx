import { useState } from "react";
import StepSelectClient from "../components/invoicesSteps/StepSelectClient";
import StepSelectProducts from "../components/invoicesSteps/StepSelectProducts";
import StepSelectDriver from "../components/invoicesSteps/StepSelectDriver";
import StepInvoiceDetails from "../components/invoicesSteps/StepInvoiceDetails";
import StepReviewConfirm from "../components/invoicesSteps/StepReviewConfirm";

export default function InvoiceWizard({ onClose }) {
  const [step, setStep] = useState(0);

  const [invoiceData, setInvoiceData] = useState({
    clientId: null,
    clientAdresse: "",
    items: [], // { productId, quantity, price }
    driverId: null,
    driverDestination: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const steps = [
    { title: "Select Client", component: StepSelectClient },
    { title: "Select Products", component: StepSelectProducts },
    { title: "Select Driver", component: StepSelectDriver },
    { title: "Invoice Details", component: StepInvoiceDetails },
    { title: "Review & Confirm", component: StepReviewConfirm },
  ];

  const StepComponent = steps[step].component;

  function nextStep() {
    if (step < steps.length - 1) setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function updateInvoiceData(updates) {
    setInvoiceData((prev) => ({ ...prev, ...updates }));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full md:max-w-2xl md:rounded-xl shadow-lg max-h-[95vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">{steps[step].title}</h2>

        <StepComponent
          data={invoiceData}
          updateData={updateInvoiceData}
          nextStep={nextStep}
          prevStep={prevStep}
          closeWizard={onClose}
        />
      </div>
    </div>
  );
}
