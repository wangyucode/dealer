import * as angular from "angular";
import "angular-mocks";

describe("UndercoverPlayController", () => {
    let serverURL = "";
    beforeEach(angular.mock.module("dealer.services"));
    beforeEach(inject((_serverURL_) => {
        serverURL = _serverURL_
    }));

    it("should assigned serverURL", () => {
        expect(serverURL).toBe("https://wycode.cn/web/api/public");
    });
});
