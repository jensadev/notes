const app = require('../app');
const supertest = require('supertest');
const { Note } = require('../models');

beforeAll(async () => {
    await Note.sync({ force: true });
});

test('GET /', async () => {
    await supertest(app).get('/').expect(200).expect('"API is working"');
});

test('GET /notes', async () => {
    const note = await Note.create({ note: "test", tag: "testing" });
    await supertest(app)
        .get('/notes')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
            expect(response.body[0].id).toBe(note.id);
            expect(response.body[0].note).toBe(note.note);
            expect(response.body[0].tag).toBe(note.tag);
        });
});

test('GET /notes/:id', async () => {
    const note = await Note.create({ note: "get one", tag: "testing" });
    await supertest(app)
        .get('/notes/' + note.id)
        .expect(200)
        .then((response) => {
            expect(response.body[0].id).toBe(note.id);
            expect(response.body[0].note).toBe(note.note);
            expect(response.body[0].tag).toBe(note.tag);
        });
});

test('POST /notes', async () => {
    const note = { note: "post a note", tag: "testing" };
    await supertest(app)
        .post('/notes')
        .send(note)
        .expect(200)
        .then((response) => {
            expect(response.body.id).toBeDefined();
            expect(response.body.note).toBe(note.note);
            expect(response.body.tag).toBe(note.tag);
        });
});

test('PUT /notes/:id', async () => {
    const note = await Note.create({ note: "to be updated", tag: "testing" });
    await supertest(app)
        .put('/notes/' + note.id)
        .send({ note: "updated"})
        .expect(200)
        .then((response) => {
            expect(response.body.id).toBe(note.id);
            expect(response.body.note).toBe("updated");
            expect(response.body.tag).toBe(note.tag);
        });
});

test('DELETE /notes/:id', async () => {
    const note = await Note.create({ note: "to be deleted", tag: "testing" });
    await supertest(app)
        .delete('/notes/' + note.id)
        .expect(200)
        .expect('OK');
});