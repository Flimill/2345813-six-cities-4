import { InternalRoutes } from '../../const/const';

function Error404Page(): JSX.Element {
  return (
    <html>
      <head>
        <style>
          {`
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              background-color: #95c2de;
            }

            .mainbox {
              background-color: #95c2de;
              margin: auto;
              height: 100vh;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: relative;
            }

            .err, .err2,.err0 {
              color: #ffffff;
              font-family: 'Nunito Sans', sans-serif;
              font-size: 11rem;
              position:absolute;
              top: 8%;
            }

            .err {
              left: 38%;
            }
            .err0 {
              left: 44%;
            }
            .err2 {
              left: 50%;
            }

            .msg {
              text-align: center;
              font-family: 'Nunito Sans', sans-serif;
              font-size: 1.6rem;
              width: 75%;
            }

            a {
              text-decoration: none;
              color: white;
            }

            a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </head>
      <body>
        <div className="mainbox">
          <div className="err">4</div>
          <div className="err0">0</div>
          <div className="err2">4</div>
          <div className="msg">Может быть, эта страница переместилась? Была удалена? Скрывается на карантине? Никогда не существовала?<p>Давай вернемся <a href={InternalRoutes.Main}>домой</a> и попробуем оттуда.</p></div>
        </div>
      </body>
    </html>
  );
}

export default Error404Page;
