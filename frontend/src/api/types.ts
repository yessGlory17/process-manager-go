export type Process = {
    pid: number;
    exe: string;
    cpu: number;
    memory: number;
    username: string;
    childrens: Process[];
}

export type ProcessDetailResult = {
    Result: Process;
}

export type goProcessResult = {
    Result: Process[]
}