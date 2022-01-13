// @author 吴志强
// @date 2021/1/14

export const listHosts = (): Promise<Result> => {
    return Promise.resolve({
        code: 200,
        data: {
            hosts: [
                {
                    id: 1,
                    ip: '123',
                    domain: '321',
                },
                {
                    id: 2,
                    ip: '1asda',
                    domain: '213123123'
                },
                {
                    id: 3,
                    ip: '12312312312',
                    domain: '123333333333'
                }
            ],
        },
    });
};
