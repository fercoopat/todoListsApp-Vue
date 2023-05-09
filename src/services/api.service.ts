export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private url: string) {}

  async get() {
    const response = await fetch(`${this.baseUrl}${this.url}`);
    return await response.json();
  }

  async getById(id: any) {
    const response = await fetch(`${this.baseUrl}${this.url}/${id}`);
    return await response.json();
  }

  async insert(data: any) {
    await fetch(`${this.baseUrl}${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        Accept: 'Application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async update(id: any, data: any) {
    await fetch(`${this.baseUrl}${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        Accept: 'Application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async delete(id: any) {
    await fetch(`${this.baseUrl}${this.url}/${id}`, { method: 'DELETE' });
  }
}
