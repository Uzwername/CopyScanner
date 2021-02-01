import { runSafely } from "./utils";

describe("runSafely", () => {
  it("Is a function", () => {
    expect(typeof runSafely).toBe("function");
  });
  
  it("Returns the same value as the executed function", () => {
    const mockToRunResult = 0.42;
    const mockToRun = jest.fn(() => mockToRunResult);
    
    expect(runSafely(mockToRun)).toBe(mockToRunResult);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockToRun).toHaveBeenCalledWith();
  });
  
  it("Passes arguments to the executed function", () => {
    const mockStrings = ["The", "result"];
    const mockStringsSeparator = " ";
    const mockToRun = jest.fn((separator, ...args) => args.join(separator));
    const expectedMockToRunResult = mockStrings.join(mockStringsSeparator);
    
    expect(runSafely(mockToRun, [mockStringsSeparator, ...mockStrings])).toBe(expectedMockToRunResult);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockToRun).toHaveBeenCalledWith(mockStringsSeparator, ...mockStrings);
  });
  
  it("Returns null by default when executed function throws", () => {
    const mockToRun = jest.fn(() => {
      throw new Error("Err");
    });
    
    expect(runSafely(mockToRun)).toBe(null);
    expect(mockToRun).toHaveBeenCalledTimes(1);
  });
  
  it("Allows customization of returned value in cases when executed function throws via error handler", () => {
    const mockToRunError = new Error("Err");
    const mockToRun = jest.fn(() => {
      throw mockToRunError;
    });
    const mockReturnFalse = jest.fn(() => false);
    
    expect(runSafely(mockToRun, undefined, mockReturnFalse, [])).toBe(false);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockReturnFalse).toHaveBeenCalledTimes(1);
    expect(mockReturnFalse).toHaveBeenCalledWith(mockToRunError);
  });
  
  it("Doesn't invoke error handler when executed function doesn't throw", () => {
    const mockToRunResult = Symbol();
    const mockToRun = jest.fn(() => mockToRunResult);
    const mockHandleError = jest.fn(() => false);
    
    expect(runSafely(mockToRun, undefined, mockHandleError)).toBe(mockToRunResult);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockToRun).toHaveBeenCalledWith();
    expect(mockHandleError).not.toHaveBeenCalled();
  });
  
  it("Passes additional arguments to error handler when executed function throws", () => {
    const mockToRunError = "Err";
    const mockToRun = jest.fn(() => {
      throw mockToRunError;
    });
    const mockHandleErrorMessage = "Woops! Something went wrong."
    const mockHandleError = jest.fn((error, errorMessageToReturn) => errorMessageToReturn);
    
    expect(runSafely(mockToRun, [], mockHandleError, [mockHandleErrorMessage])).toBe(mockHandleErrorMessage);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockToRun).toHaveBeenCalledWith();
    expect(mockHandleError).toHaveBeenCalledTimes(1);
    expect(mockHandleError).toHaveBeenCalledWith(mockToRunError, mockHandleErrorMessage);
  });
  
  it("Handles thenable objects specially when returned from the executed function", () => {
    const mockToRunSuccessHandlerResult = "Everything is just fine!";
    const mockToRunResult = {
      then: jest.fn((successHandler) => {
        return successHandler(mockToRunSuccessHandlerResult);
      })
    };
    const mockToRun = jest.fn(() => mockToRunResult);
    
    expect(runSafely(mockToRun)).toBe(mockToRunSuccessHandlerResult);
    expect(mockToRunResult.then).toHaveBeenCalledTimes(1);
    // 2 handlers were passed to then function
    expect(mockToRunResult.then.mock.calls[0]).toHaveLength(2);
  });
  
  it("Handles a Promise that resolves", async () => {
    const mockToRunPromiseResult = "Successfully resolved!";
    const mockToRun = jest.fn(() => Promise.resolve(mockToRunPromiseResult));
    
    expect(await runSafely(mockToRun)).toBe(mockToRunPromiseResult);
    expect(mockToRun).toHaveBeenCalledTimes(1);
  });
  
  it("Handles a Promise that rejects returning null by default", async () => {
    const mockToRunPromiseResult = "Something went wrong in async manner. We will surely fix it soon.";
    const mockToRun = jest.fn(async () => {
      throw mockToRunPromiseResult;
    });
    
    expect(await runSafely(mockToRun)).toBe(null);
    expect(mockToRun).toHaveBeenCalledTimes(1);
  });
  
  it("Handles a Promise that rejects using an error handler", async () => {
    const mockToRunPromiseRejectionReason = "unknown";
    const mockToRun = jest.fn((rejectionReason) => Promise.reject(rejectionReason));
    const mockHandleErrorResult = false;
    const mockHandleError = jest.fn((error, returnValue) => returnValue);
    
    expect(await runSafely(mockToRun, [mockToRunPromiseRejectionReason], mockHandleError, [mockHandleErrorResult])).toBe(mockHandleErrorResult);
    expect(mockToRun).toHaveBeenCalledTimes(1);
    expect(mockToRun).toHaveBeenCalledWith(mockToRunPromiseRejectionReason);
    expect(mockHandleError).toHaveBeenCalledTimes(1);
    expect(mockHandleError).toHaveBeenCalledWith(mockToRunPromiseRejectionReason, mockHandleErrorResult);
  });
});