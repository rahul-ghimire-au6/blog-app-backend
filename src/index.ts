import app from './app';

let Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`Server listening at ${Port}`);
});
