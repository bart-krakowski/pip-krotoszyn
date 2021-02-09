/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34983
 */

import { HelmetData } from "react-helmet";
declare module "react-helmet" {
  export interface HelmetData {
    metaTags: {
      name?: string;
      property?: string;
      content: string;
    }[];
  }
}
