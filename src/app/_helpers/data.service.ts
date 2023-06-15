import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {

    constructor() { }

    createDb() {
        let users : User[] = [
            { id: 1, title: 'Mr', firstName: 'Ajeet', lastName: 'Singh', dob: '2000-05-15', email: 'ajeet@test.com', password: '12345', acceptTerms: true},
            { id: 1, title: 'Mr', firstName: 'Chandan', lastName: 'Singh', dob: '2002-08-20', email: 'chandan@test.com', password: '12345', acceptTerms: true},

        ];
        return { users };
    }
}
