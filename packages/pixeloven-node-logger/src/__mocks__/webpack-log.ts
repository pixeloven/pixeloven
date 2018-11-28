interface WebpackLogConfig {
    name?: string,
    level?: string,
    unique?: boolean
}

const MockLogger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
}

const MockLog = {
    log: jest.fn((config: WebpackLogConfig) => MockLogger),
}

export default MockLog;