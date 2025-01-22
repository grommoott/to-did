import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt"

@Injectable()
export class HashService {
    private saltRounds: number = 10

    hash(str: string): Promise<string> {
        return bcrypt.hash(str, this.saltRounds)
    }

    compare(hash: string, data: string): Promise<boolean> {
        return bcrypt.compare(data, hash)
    }
}
