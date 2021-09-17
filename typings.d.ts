declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
    export function ReactComponent(
        props: React.SVGProps<SVGSVGElement>,
    ): React.ReactElement;

    const url: string;
    export default url;
}

declare global {
    interface Window {
        electron: {
            setEnvironmentVariable: (key: string, value: string) => Promise<Result>;
            listEnvironmentVariables: () => Promise<Result>;
            deleteEnvironmentVariable: (Key: string) => Promise<Result>;
        };
    }
}

export {}
