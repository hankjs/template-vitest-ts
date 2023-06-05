import { describe, test, expect, vi, beforeEach } from "vitest";
import { JSDOM } from "jsdom";

describe("jsdom", () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  });

  test("querySelector", () => {
    expect(dom.window.document.querySelector("p").innerHTML).toBe(
      "Hello world",
    );
  });

  test("insertAdjacentHTML", () => {
    const p = dom.window.document.querySelector("p");
    p.insertAdjacentHTML("afterend", "<p>Goodbye world</p>");
    expect(dom.window.document.querySelector("p").innerHTML).toBe(
      "Hello world",
    );
    expect(dom.window.document.querySelectorAll("p").length).toBe(2);
  });

  test("addEventListener", () => {
    const p = dom.window.document.querySelector("p");
    const mockFn = vi.fn();
    p.addEventListener("click", mockFn);
    p.click();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("removeEventListener", () => {
    const p = dom.window.document.querySelector("p");
    const mockFn = vi.fn();
    p.addEventListener("click", mockFn);
    p.removeEventListener("click", mockFn);
    p.click();
    expect(mockFn).toBeCalledTimes(0);
  });

  test("appendChild", () => {
    const p = dom.window.document.querySelector("p");
    const span = dom.window.document.createElement("span");
    p.appendChild(span);
    expect(p.innerHTML).toBe("Hello world<span></span>");
  });
});
