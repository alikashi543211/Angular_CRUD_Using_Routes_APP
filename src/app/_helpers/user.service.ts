import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private API_BASE_PATH: string = "http://localhost:4200/api/";

    constructor(private _httpService: HttpClient) {
    }

    addUser(user: User) {
        return this._httpService.post(`${this.API_BASE_PATH}users`, user);
    }

    deleteUser(userId: number) {
        return this._httpService.delete(`${this.API_BASE_PATH}users/${userId}`);
    }

    getUser(userId: number) {
        return this._httpService.get(`${this.API_BASE_PATH}users/${userId}`)
    }

    getUsers() {
        return this._httpService.get(`${this.API_BASE_PATH}users`);
    }

    updateUser(user: User) {
        return this._httpService.put(`${this.API_BASE_PATH}users/${user.id}`, user)
    }



}
