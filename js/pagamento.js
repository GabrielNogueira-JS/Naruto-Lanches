const params = new URLSearchParams(location.search);
const pedidoId = params.get('order') || '00';
let total = params.get('total') || '0.00';

// Substitui vírgula por ponto pra evitar problema no valor PIX
total = total.replace(',', '.');

document.getElementById('pedido-id').textContent = pedidoId;
document.getElementById('valor').textContent = total;

function gerarPayloadPix({ pixKey, descricao, nomeLoja, cidade, valor }) {
  function montarCampo(id, valor) {
    const length = valor.length.toString().padStart(2, '0');
    return id + length + valor;
  }

  const gui = "BR.GOV.BCB.PIX";
  const txid = pedidoId;

  const payloadSemCRC =
    montarCampo("00", "01") + // Payload Format Indicator
    montarCampo("26",
      montarCampo("00", gui) +
      montarCampo("01", pixKey)
    ) +
    montarCampo("52", "0000") + // Merchant Category Code
    montarCampo("53", "986") +  // Currency (BRL)
    montarCampo("54", valor) +  // Valor
    montarCampo("58", "BR") +   // País
    montarCampo("59", nomeLoja.toUpperCase()) +
    montarCampo("60", cidade.toUpperCase()) +
    montarCampo("62",
      montarCampo("05", txid)
    ) +
    "6304"; // Código CRC com 4 dígitos

  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  const crc = crc16(payloadSemCRC);
  return payloadSemCRC + crc;
}

const pixKey = "+5515997538136";
const descricao = "Pagamento do pedido #" + pedidoId;
const nomeLoja = "Naruto-Lanches LTDA";
const cidade = "SOROCABA";

const payloadPIX = gerarPayloadPix({
  pixKey,
  descricao,
  nomeLoja,
  cidade,
  valor: total
});

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  document.getElementById('qrcode').appendChild(canvas);
  QRCode.toCanvas(canvas, payloadPIX, { width: 256 }, function (error) {
    if (error) {
      console.error("Erro ao gerar QR Code:", error);
    } else {
      console.log("QR Code gerado com sucesso!");
    }
  });
});
