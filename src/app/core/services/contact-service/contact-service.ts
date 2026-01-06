import {Injectable} from '@angular/core';
import {Base} from "@services/base/base";
import {CreateContactMessage, ContactMessage} from "@interfaces/contact-message.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService extends Base {
  protected readonly resourcePath = 'contact';

  sendMessage(payload: CreateContactMessage): Observable<ContactMessage> {
    return this.post<ContactMessage>('', payload, true);
  }
}
