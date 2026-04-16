@echo off
setlocal enabledelayedexpansion
title DataFlow Studio — Iniciando...

echo.
echo  =====================================================
echo   DataFlow Studio ^| Plataforma de Dashboarding B2B
echo  =====================================================
echo.

:: ── Verificar que Docker este corriendo ───────────────
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo  [ERROR] Docker no esta corriendo.
    echo  Por favor inicia Docker Desktop y vuelve a ejecutar este script.
    echo.
    pause
    exit /b 1
)
echo  [OK] Docker esta activo.

:: ── Ir al directorio del proyecto ─────────────────────
cd /d "%~dp0"

:: ── Copiar .env si no existe ───────────────────────────
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo  [INFO] Se creo .env a partir de .env.example
        echo  [AVISO] Edita el archivo .env con tus credenciales antes de continuar.
        echo.
        pause
    ) else (
        echo  [AVISO] No se encontro .env ni .env.example
    )
) else (
    echo  [OK] Archivo .env encontrado.
)

:: ── Levantar servicios ─────────────────────────────────
echo.
echo  Levantando servicios con Docker Compose...
echo  (La primera vez puede tardar varios minutos mientras se descargan las imagenes)
echo.

docker-compose up --build -d

if %ERRORLEVEL% neq 0 (
    echo.
    echo  [ERROR] Hubo un problema al levantar los servicios.
    echo  Revisa los logs con:  docker-compose logs
    echo.
    pause
    exit /b 1
)

:: ── Esperar a que la API este lista ───────────────────
echo.
echo  Esperando a que la API este lista...
set INTENTOS=0
:WAIT_API
set /a INTENTOS+=1
if %INTENTOS% gtr 30 (
    echo  [AVISO] La API tarda mas de lo esperado. Puede seguir iniciando en segundo plano.
    goto SHOW_URLS
)
curl -s -o nul -w "%%{http_code}" http://localhost:8000/health 2>nul | findstr "200" >nul
if %ERRORLEVEL% neq 0 (
    timeout /t 2 /nobreak >nul
    goto WAIT_API
)
echo  [OK] API lista.

:SHOW_URLS
echo.
echo  =====================================================
echo   Servicios disponibles:
echo.
echo   Frontend   →  http://localhost:3000
echo   API REST   →  http://localhost:8000
echo   API Docs   →  http://localhost:8000/docs
echo   ReDoc      →  http://localhost:8000/redoc
echo  =====================================================
echo.

:: ── Abrir el navegador ────────────────────────────────
set /p ABRIR="  Abrir el navegador ahora? (S/N): "
if /i "%ABRIR%"=="S" (
    start "" "http://localhost:3000"
    start "" "http://localhost:8000/docs"
)

echo.
echo  Comandos utiles:
echo    Ver logs en vivo:   docker-compose logs -f
echo    Detener todo:       docker-compose down
echo    Reiniciar:          docker-compose restart
echo.
pause
