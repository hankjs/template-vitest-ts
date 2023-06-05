import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

// The component to test
const MessageComponent = {
    template: "<p>{{ msg }}</p>",
    props: ["msg"],
};

describe("@vue/test-utils", () => {
    test("displays message", () => {
        const wrapper = mount(MessageComponent, {
            props: {
                msg: "Hello world",
            },
        });

        // Assert the rendered text of the component
        expect(wrapper.text()).toContain("Hello world");
    });
});
