import { describe, test, expect, vi } from "vitest";

describe("Vitest Guide", async () => {
  test("测试输出是否符合预期", async () => {
    // expect(表达式).toBe(期望的值);
    expect(1 + 1).toBe(2);

    // 和上面的本质是一样的，表达式的值和期望值对比
    const add = (a: number, b: number) => a + b;
    expect(add(1, 1)).toBe(2);
  });

  describe("mock函数", async () => {
    test("测试函数执行次数", () => {
      const mockFn = vi.fn();

      // 未调用
      expect(mockFn).toBeCalledTimes(0);

      // 调用一次
      mockFn();
      expect(mockFn).toBeCalledTimes(1);

      // 调用多次
      mockFn();
      mockFn();
      // 调用次数是累加的
      expect(mockFn).toBeCalledTimes(3);
    });

    test("测试函数执行时的参数", () => {
      const mockFn = vi.fn();

      mockFn(1, 2);
      expect(mockFn).toBeCalledWith(1, 2);

      mockFn(3, 4);
      expect(mockFn).toBeCalledWith(3, 4);
    });

    test("测试函数执行时的返回值", () => {
      /** 无入参的模拟函数 */
      const mockFn = vi.fn(() => 1);

      expect(mockFn()).toBe(1);
      /** 带入参的模拟函数 */
      const mockParamFn = vi.fn((x, y) => [x, y]);
      expect(mockParamFn(1, 2)).toEqual([1, 2]);
    });

    test("mock console.warn", () => {
      const spyWarn = vi.spyOn(console, "warn");
      const msg = "hello console";

      console.warn(msg);

      expect(spyWarn).toBeCalledWith(msg);
    });
  });

  describe("定时器、Promise", () => {
    test("setTimeout", async () => {
      let data = { foo: 1 };

      // 定时器使用vitest的
      vi.useFakeTimers();

      setTimeout(() => {
        data.foo = 2;
      }, 1000);

      // 等待所有定时器执行结束
      await vi.runAllTimersAsync();
      expect(data.foo).toBe(2);
    });

    test("Promise", async () => {
      let data = { foo: 1 };

      // 定时器使用vitest的
      vi.useFakeTimers();

      function getData() {
        return new Promise((resolve) => {
          setTimeout(() => {
            data.foo = 2;
            resolve(null);
          }, 1000);
        });
      }
      getData();

      /** 等待全部Promise完成 */
      await vi.runOnlyPendingTimersAsync();
      expect(data.foo).toBe(2);
    });
  });
});
