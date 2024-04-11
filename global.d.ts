import en from "./messages/en.json";
import hr from "./messages/hr.json";

type EnMessages = typeof en;
type HrMessages = typeof hr;

declare global {
  interface IntlMessages extends EnMessages, HrMessages {}
}
