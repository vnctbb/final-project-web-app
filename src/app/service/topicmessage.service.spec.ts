import { TestBed } from '@angular/core/testing';

import { TopicmessageService } from './topicmessage.service';

describe('TopicmessageService', () => {
  let service: TopicmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
