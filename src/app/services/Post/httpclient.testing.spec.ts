import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

let testUrl = '/data';
interface Data {
  name: string;
}

describe('Http Client testing Module', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call the test url with get request', () => {
    const testData: Data = { name: 'Kajamohan' };

    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    // here we need to use expectOne() method to get the request
    const req = httpTestingController.expectOne(testUrl);

    // this is used to send the response to the subscriber
    req.flush(testData);

    expect(req.request.method).toBe('GET');
  });

  it('should test multiple requests', () => {
    const testData: Data[] = [
      {
        name: 'Kajamohan',
      },
      {
        name: 'Niroshan',
      },
    ];

    // call the get method 3 times
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data.length).toEqual(0);
    });

    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual([testData[0]]);
    });

    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    // here we need to use match() method to get the requests
    const requests = httpTestingController.match(testUrl);

    console.log(requests);
    expect(requests.length).toBe(3);

    // define the response for each request
    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });
});
