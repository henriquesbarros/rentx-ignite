import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "676981",
            email: "po@vu.mu",
            name: "Leila Nunez",
            password: "6304",
        });

        await sendForgotPasswordMailUseCase.execute("po@vu.mu");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("faejate@vowhogje.mn")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "480271",
            email: "dapogkug@suwnanla.ie",
            name: "Ruth Pope",
            password: "4755",
        });

        await sendForgotPasswordMailUseCase.execute("dapogkug@suwnanla.ie");

        expect(generateTokenMail).toBeCalled();
    });
});
