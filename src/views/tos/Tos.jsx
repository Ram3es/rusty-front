import { useI18n } from "../../i18n/context";

const Tos = () => {
  const i18n = useI18n();

  return (
    <>
      <div class="w-full h-full pt-16 flex flex-col gap-12 overflow-y-scroll relative pb-16">
        <p class="text-24 text-white font-medium font-Oswald uppercase mx-auto">
          {i18n.t("tos.Terms of service_heading")}
        </p>
        <div class="flex flex-col gap-6 px-10 py-8 bg-dark-20">
          <p class="text-24 text-white font-medium font-Oswald uppercase leading-none">
            {i18n.t("tos.Terms of service")}
          </p>
          <p class="text-16 text-gray-b9 font-semibold leading-none">
            {i18n.t("tos.Terms of service_text")}
          </p>

          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Age Requirement")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Age Requirement_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Website information")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Website information_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Restricted Regions")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Restricted Regions_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Affiliation")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Affiliation_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Payments")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Payments_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Lost Items")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Lost Items_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Limitation on Liabilities")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.Limitation on Liabilities_text")}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-16 text-white font-medium font-Oswald uppercase">
              {i18n.t("tos.Dispute")}
            </p>
            <p class="text-14 text-gray-b9 font-medium mb-2">
              {i18n.t("tos.Dispute_text")}
            </p>
            <p class="text-14 text-gray-b9 font-medium">
              {i18n.t("tos.In the event_text")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tos;
