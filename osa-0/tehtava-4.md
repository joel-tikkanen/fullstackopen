Selain -> Palvelin (POST-pyyntö https://studies.cs.helsinki.fi/exampleapp/new_note)
Palvelin -> Selain (uudelleenohjauspyyntö)
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/notes)
Palvelin -> Selain (HTML-tiedosto)
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/main.css)
Palvelin -> Selain (main.css tiedosto)
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/main.js)
Palvelin -> Selain (main.js tiedosto)
Selain alkaa suorittamaan tiedostoa.
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/data.json)
Palvelin -> Selain (data.json tiedosto)
Lopuksi data.json tiedoston ladattua selain renderöi sen tiedot.

