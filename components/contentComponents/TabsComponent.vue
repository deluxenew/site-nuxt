<template>
  <div class="tabs" >
    <input type="radio" id="profile" value="1" name="tractor" checked='checked' />
    <input type="radio" id="settings" value="2" name="tractor" />
    <input type="radio" id="posts" value="3" name="tractor" />
    <input type="radio" id="books" value="4" name="tractor" />

    <nav>
      <label for="profile" class='fa fa-camera-retro'>Брусовые дома</label>
      <label for="settings" class='fa fa-film'>Каменные дома</label>
      <label for="posts" class='fa fa-calendar'>123</label>
      <label for="books" class='fa fa-list-alt'>123</label>
    </nav>

    <article class='uno'>
      <h2>
        Брусовые дома
        <span>Брусовые дома</span></h2>
      <footer>
        <ul>
          <li class='fa fa-link'></li>
          <li class='fa fa-bar-chart'></li>
          <li class='fa fa-sitemap'></li>
          <li class='fa fa-wrench'></li>
          <li class='fa fa-magic'></li>
        </ul>
      </footer>
    </article>

    <article class='dos fa fa-wrench'>
      <p>Si hay algún fenómeno en la web que sea lo más parecido a las setas eso son los blogs, cursos y enseñanzas web. Todo lo relativo a la divulgación, de cualquier materia o parcela del conocimiento humano, angelical o mefistofélico, tiene su oferta, sus "maestros" y sus cocinillas visionarios.</p>
    </article>

    <article class='tres fa fa-beer'>
      <ol>
        <li>Dimensionado de imágenes y objetos en CSS</li>
        <li>Evita pulsaciones no deseadas al hacer scroll</li>
        <li>¿Qué es CSS?</li>
        <li>CSS Style Attributes. La especificación</li>
        <li>Múltiples labels por cada input </li>
        <li>Sintaxis de Css y Glosario de términos</li>
      </ol>
    </article>

    <article class='cuatro fa fa-copy'>
      <dl>
        <dt>Guía de Transiciones Css</dt>
        <dd>Todas y cada una de las propiedades css que componen el grupo de las transitions con demos.</dd>
        <dt>@Font-face y sus problemas</dt>
        <dd>Los problemas más comunes y sus soluciones, que suelen presentarse al utilizar la regla @font-face de Css para mostrar los textos en tipografías distintas a las safety fonts.</dd>
      </dl>
    </article>
  </div>
</template>

<script>
export default {
  name: "TabsComponent"
}
</script>

<style lang="scss" scoped>
*, *:after, *:before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
* {margin:0;padding:0;border: 0 none;position: relative;}
[class="fa"]:before {font-family: 'fontawesome', sans-serif;}


.tabs {
  background: #31A66C;
  width: 100%;
  max-width: 100%;
  min-width: 390px;
  height: 50%;
  margin: $largePadding auto;
  //box-shadow: 0 0 6px rgba(0,0,0,.4);
}
article {
  position: absolute;
  left: 0;
  top: 5rem;
  right: 0;
  bottom: 0;
  padding: 1rem 2rem 0;
  overflow: auto;
  transition: .7s;
  transform: scale(0);
  transform-origin: center right;
  transition-delay: .1s;
}
article:before {
  color: rgba(0,0,0,.2);
  font-size: 4rem;
  font-weight: 100;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
h2 {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: rgba(0,0,0,.6);
}
body > h2 {height: auto;}
h2 img {
  width: 120px;
  height: auto;
  background: #f9f9f9;
  border: 5px solid rgba(0,0,0,.7);
  border-radius: 50%;
  padding: 5px;
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 7px rgba(0,0,0,.5);
}
h2 span {
  font-family: $font;
  font-weight: 400;
  display: block;
  margin-bottom: 1rem;
}
footer ul {
  width: 100%;
  color: #037B49;
}
footer li {
  list-style-type: none;
  float: left;
  width: 20%;
  text-align: center;
  font-size: 3rem;
  font-weight: 100;
}
footer li::before {
  display: block;
  text-align: center;
  font-size: 3rem;
  font-weight: 100;
}
p, dl, ol {
  line-height: 1.5;
  font-size: 1.3rem;
}
ol li {margin: 0 0 .5rem 1rem;}
dt {
  font-size: 1.6rem;
  font-weight: 600;
  text-indent: 1.5rem;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 100%;
  //box-shadow: 0 0 6px rgba(0,0,0,.4);
}
nav:after {
  content:'';
  width: 25%;
  font-size: $h2;
  padding: $mediumPadding;
  margin:  0;
  background: #BEE3D1;
  position: absolute;
  transition: .5s;
}
input {
  display: none;
}
label {
  width: 25%;
  float: left;
  color: #BEE3D1;
  text-align: center;
  cursor: pointer;
  transition: .5s;
  font-size: $p;
  line-height: $p;
  z-index: 2;
  padding: $smallPadding;
}
label:hover {color: #1E6743;}
label:before {
  display: block;

  z-index: 2;
}
#profile:checked ~ nav [for='profile'],
#settings:checked ~ nav [for='settings'],
#posts:checked ~ nav [for='posts'],
#books:checked ~ nav [for='books'] {
  color: #000;
  font-weight: 600;
}
#settings:checked ~ nav[for='settings'] {}
#profile:checked ~ nav[for='profile'] {}

#profile:checked ~ nav:after {
  left: 0;
}
#settings:checked ~ nav:after {
  left:25%;
  border-top: 0 none;
}
#posts:checked ~ nav:after {
  left: 50%;
}
#books:checked ~ nav:after {
  left: 75%;
}

#profile:checked ~ .uno,
#settings:checked ~ .dos,
#posts:checked ~ .tres,
#books:checked ~ .cuatro {
  display: block;
  transform: scale(1);
  transition-delay: .5s;
}

a {color: rgba(0,0,0,.4)}
a:hover {color: rgba(0,0,0,.2)}
</style>
