## Start node server
#### (Optoin 1). Run app from console
1. Edit the environment variables in [.env](.env)

2.  Build
```
npm install
npm run build
```

3.  Run
```
npm run start
```

#### (Optoin 2). Run app using Docker
1. Edit the environment variables in [.env](.env)

2.  Build a Docker image
```
npm install
npm run build
docker build -f Dockerfile -t feh-voting-gauntlet-weaker-norifier:latest .
```

3.  Run
```
docker run -it -p 3000:3000 feh-voting-gauntlet-weaker-norifier:latest
```

#### (Option 3). Run app from Visual Studio Code
1. Open your local repository with Visual Studio Code
1.  Edit the environment variables in [.env](.env)
1. Select **Debug** -> **Start Debugging**