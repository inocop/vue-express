pushd ..\src\docker\vue_dev
cmd /k docker-compose exec -e COLUMNS=200 -e LINES=50 web bash
