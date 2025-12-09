import "@testing-library/jest-dom";

// Polyfill window.scrollTo for jsdom
if (typeof window !== "undefined") {
  // override any jsdom default implementation which throws 'Not implemented'
  window.scrollTo = () => {};
}

// Polyfill Element.prototype.scrollTo for jsdom as well
if (
  typeof window !== "undefined" &&
  typeof window.HTMLElement !== "undefined"
) {
  // override jsdom unimplemented scrollTo if present
  window.HTMLElement.prototype.scrollTo = function (options) {
    // Basic implementation to update scrollLeft/Top
    if (!options) return;
    if (typeof options === "number") {
      this.scrollLeft = options;
    } else if (typeof options === "object") {
      if (typeof options.left === "number") this.scrollLeft = options.left;
      if (typeof options.top === "number") this.scrollTop = options.top;
    }
  };
}

// Global mock for next/image to avoid passing boolean props to native img
const React = require("react");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (allProps) => {
    const { fill, priority, ...props } = allProps || {};
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement("img", { ...props, alt: props.alt || "" });
  },
}));
