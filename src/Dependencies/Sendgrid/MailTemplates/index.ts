const style = `<style scoped>
  .body-row { 
              width: 40%;
              text-align: center;
              margin-left: 30%;
              margin-right: 30%;
           }
  @media (min-width: 300px) {
          .body-row { 
              width: 100%;
              text-align: center;
           }
  }
</style>`;

export const example = ({ dynamic_link }: { dynamic_link: string }) =>
  `${style}
  <table style="width: 100%">
      <tr style="width: 100%; height: auto; background-color: #050618">
        <td style="text-align: center">
          <img
            style="width: 200px; height: auto"
            src="your_image"
          />
          <h1
            style="
              text-align: center;
              font-weight: 500;
              color: white;
              font-size: 30px;
            "
          >
          TITULO
          </h1>
        </td>
      </tr>

      <tr style="width: 70%; height: auto; background-color: white; margin: 0">
        <td style="text-align: left">
          <div class="body-row">
            <h3 style="color: black; text-align: left">Hola ,</h3>
            <p style="color: black; text-align: left">
              Tu DL:
              <a href="${dynamic_link}" style="color: #50eb7b">
                <b>LINK</b>
              </a>
            </p>
            <p style="color: black; text-align: left">
              <span>
                <small>
                  Si usted no solicitó este servicio, omita este mensaje.
                </small>
              </span>
            </p>
          </div>
        </td>
      </tr>
      <tr style="width: 70%; height: auto; background-color: white; margin: 0">
        <td style="text-align: left"></td>
      </tr>
      <tr
        style="width: 100%; height: auto; background-color: #050618; margin: 0"
      >
        <td style="text-align: center">
          <h4 style="color: white; text-align: center">
            Más información en :
            <a
              style="padding-left: 10px; color: #50eb7b"
              href="https://www.innovaweb.cl"
              target="_blank"
            >
              www.innovaweb.cl</a
            >
          </h4>
        </td>
      </tr>
    </table>`;
