import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'}) //Con esto hacemos que toda la aplicación de Angular sepa del servicio. Inyectamos en el componente "root"
                                  //Si no usamos esta línea, hay que registrar el servicio en el app.module.ts, en providers: [EmployeeService]
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiServerUrl}/Person/all`); //Pasamos la URL que vamos a definir más arriba. Esta es una notación de TS que permite poner una variables
                                                                    //y luego un string.
  } //Con esto le estoy diciendo al cliente http dónde hacer la request y el tipo de request. Le estaos diciendo que va a aer una GET request y va a retornar un tipo any.
    //Y como se trata de una GET no hace falta que pasemos nada en el body y no tenemos ningún encabezado.

  public findPerson(personId: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiServerUrl}/person/find/${personId}`);
  }
  
  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
  }

  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);
  }
}
