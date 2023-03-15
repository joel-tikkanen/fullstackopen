Selain -> Palvelin (POST-pyyntö https://studies.cs.helsinki.fi/exampleapp/new_note)<br />
Palvelin -> Selain (uudelleenohjauspyyntö)<br />
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/notes)<br />
Palvelin -> Selain (HTML-tiedosto)<br />
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/main.css)<br />
Palvelin -> Selain (main.css tiedosto)<br />
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/main.js)<br />
Palvelin -> Selain (main.js tiedosto)<br />
Selain alkaa suorittamaan tiedostoa.<br />
Selain -> Palvelin (GET-pyyntö https://studies.cs.helsinki.fi/exampleapp/data.json)<br />
Palvelin -> Selain (data.json tiedosto)<br />
Lopuksi data.json tiedoston ladattua selain renderöi sen tiedot.<br />

