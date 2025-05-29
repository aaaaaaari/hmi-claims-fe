import { Viewer } from "@react-pdf-viewer/core";

interface Props {
  filePreviews: any;
  handleNewUpload: () => void;
  results: any;
}

export default function ResultPage({
  filePreviews,
  handleNewUpload,
  results,
}: Props) {
  const renderConfidenceBadge = (confidence: string) => {
    const getColor = (conf: string) => {
      switch (conf?.toLowerCase()) {
        case "high":
          return "bg-green-100 text-green-800 border-green-200";
        case "medium":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "low":
          return "bg-red-100 text-red-800 border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    return (
      <span
        className={`capitalize inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColor(
          confidence
        )}`}
      >
        {confidence || "Unknown"}
      </span>
    );
  };

  const structuredData = results.processed_documents[0].invoice_data;

  return (
    <div className="mt-5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-screen">
          {/* Document Preview Section - Left Side */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Document Preview
                    </h3>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      onClick={handleNewUpload}
                    >
                      Add New Claim
                    </button>
                  </div>
                </div>

                {/* Status and Claimable Amount Section */}
                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    {results.overall_claim_status === "approved" ? (
                      <h4 className="text-base font-semibold text-green-600 capitalize">
                        Status: Approved
                      </h4>
                    ) : (
                      <h4 className="text-base font-semibold text-orange-600">
                        Status: Pending Review
                      </h4>
                    )}
                  </div>
                  {results.processed_documents &&
                    results.processed_documents.length > 0 &&
                    results.processed_documents[0].adjudication
                      .claimable_amount_sgd !== undefined && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">
                          Claimable Amount
                        </div>
                        <div className="text-xl font-bold">
                          SGD $
                          {
                            results.processed_documents[0].adjudication
                              .claimable_amount_sgd
                          }
                        </div>
                      </div>
                    )}
                </div>

                {/* Review Reasons Section - only show if status is pending_review */}
                {results.overall_claim_status === "pending_review" &&
                  results.processed_documents &&
                  results.processed_documents.length > 0 &&
                  results.processed_documents[0].adjudication?.reasons && (
                    <div className="my-10 p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-medium mb-3 text-red-900">
                        Review Required - Exclusions Found
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-red-100">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium text-red-800">
                                Type
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-red-800">
                                Item/Field
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-red-800">
                                Description
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-red-800">
                                Policy Reference
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-red-200">
                            {results.processed_documents[0].adjudication.reasons.map(
                              (reason: any, index: number) => (
                                <tr key={index} className="hover:bg-red-25">
                                  <td className="px-3 py-2 font-medium text-red-700">
                                    {reason.type}
                                  </td>
                                  <td className="px-3 py-2 text-red-600">
                                    {reason.offending_field_or_item}
                                  </td>
                                  <td className="px-3 py-2 text-red-600">
                                    {reason.description}
                                  </td>
                                  <td className="px-3 py-2 text-red-600 font-mono text-xs">
                                    {reason.policy_reference}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Scrollable Preview Area */}

            {filePreviews.length > 0 ? (
              <div className="space-y-4 my-4">
                {filePreviews.map((preview: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-md overflow-hidden ring-2 ring-blue-500`}
                  >
                    <div className="p-4">
                      {preview.type === "pdf" ? (
                        <div
                          className="border border-gray-200 rounded"
                          style={{ height: "600px" }}
                        >
                          <Viewer fileUrl={preview.url} />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <img
                            src={preview.url}
                            alt={preview.file.name}
                            className="max-w-full max-h-96 object-contain rounded border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                No files to preview
              </div>
            )}
          </div>

          {/* Extracted Data Review Section - Right Side */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 mb-10">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Review Extracted Information
              </h3>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-900">
                General Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="clinic_name"
                  >
                    Clinic Name{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.clinic_name_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="clinic_name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.clinic_name || ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="clinic_address"
                  >
                    Clinic Address{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.clinic_address_confidence || ""
                      )}
                    </span>
                  </label>
                  <input
                    id="clinic_address"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.clinic_address}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="invoice_number"
                  >
                    Invoice No.{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.invoice_date_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="invoice_number"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300`}
                    value={structuredData.invoice_number || ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="invoice_date"
                  >
                    Invoice Date{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.invoice_date_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="invoice_date"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300`}
                    value={structuredData.invoice_date || ""}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-900">
                Financial Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="invoice_currency"
                  >
                    Currency{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.invoice_currency_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="invoice_currency"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.invoice_currency || ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="amount_paid"
                  >
                    Amount Paid{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.amount_paid_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="amount_paid"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.amount_paid || ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="gst_tax_amount"
                  >
                    GST/Tax Amount{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.gst_tax_amount_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="gst_tax_amount"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.gst_tax_amount || ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="service_charge_tax_amount"
                  >
                    Service Charge Amount{" "}
                    <span className="ml-1">
                      {renderConfidenceBadge(
                        structuredData.service_charge_tax_amount_confidence
                      )}
                    </span>
                  </label>
                  <input
                    id="service_charge_tax_amount"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={structuredData.service_charge_tax_amount || ""}
                    disabled
                  />
                </div>
              </div>
            </div>

            {structuredData.currency_information && (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-3 text-gray-900">
                  Currency Exchange Details{" "}
                  <span className="ml-1">
                    {renderConfidenceBadge(
                      structuredData.currency_information.confidence
                    )}
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Currency
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={
                        structuredData.currency_information.invoice_currency ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Amount
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={
                        structuredData.currency_information.invoice_amount || ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SGD Amount
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={
                        structuredData.currency_information.singapore_amount ||
                        ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exchange Rate
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={
                        structuredData.currency_information.exchange_rate ||
                        "1.00"
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {structuredData.subsidy && (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-3 text-gray-900">
                  Subsidy Information{" "}
                  <span className="ml-1">
                    {renderConfidenceBadge(structuredData.subsidy.confidence)}
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Type:</strong>{" "}
                    {structuredData.subsidy.subsidy_type || "N/A"}
                  </p>
                  <p>
                    <strong>Amount:</strong>{" "}
                    {structuredData.subsidy.subsidy_amount?.toFixed(2) ?? "N/A"}
                  </p>
                </div>
              </div>
            )}

            {structuredData.line_items && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-base font-semibold text-gray-900">
                    Line Items
                  </h4>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-20">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-32">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-28">
                          Confidence
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {structuredData.line_items &&
                      structuredData.line_items.length > 0 ? (
                        structuredData.line_items.map(
                          (item: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={item.description || ""}
                                  readOnly
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  className="text-right w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={item.quantity || ""}
                                  readOnly
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  step="0.01"
                                  className="text-center w-full px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={item.price || ""}
                                  readOnly
                                />
                              </td>
                              <td className="px-4 py-3 text-center">
                                {renderConfidenceBadge(item.confidence)}
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-gray-500 text-sm"
                          >
                            No line items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Document Confidence{" "}
                <span className="ml-2 font-xl">
                  {renderConfidenceBadge(
                    structuredData.overall_confidence.toUpperCase() || "UNKNOWN"
                  )}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
