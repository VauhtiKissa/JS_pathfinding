document.addEventListener("DOMContentLoaded", () => {

  let maat = document.querySelectorAll(".game div")

  let aloitus = 2
  let loppu = 6
  const seinat = [5,15]
  width = Math.sqrt(maat.length)
  maat[loppu].classList.add("kohde")
  maat[aloitus].classList.add("hahmo")

  for (let i = 0; i < seinat.length; i++) {
    maat[seinat[i]].classList.add("seina")
  }

  function etsiReitti(hahmo, kohde){
    let y = 0
    let loyty = false
    let listanPituus = 0
    let uudet = []
    let tutkittavat = []
    let vanhat = []
    let valmiit = []
    tutkittavat.push(hahmo)

    while (y != width*width && loyty == false) {

      //Katsoo onko kohde loytynyt
      if (tutkittavat.includes(kohde)) {
        loyty = true
      }

      //Katsoo voiko alas pain menna
      for (let i = 0; i < tutkittavat.length; i++) {
        if (!vanhat.includes(tutkittavat[i]+width) && !uudet.includes(tutkittavat[i]+width) && tutkittavat[i]+width < width*width && ! maat[tutkittavat[i]+width].classList.contains("seina"))
        {
          uudet.push(tutkittavat[i]+width)
        }
      }

      //Katsoo voiko ylos pain menna
      for (let i = 0; i < tutkittavat.length; i++) {
        if (!vanhat.includes(tutkittavat[i]-width) && !uudet.includes(tutkittavat[i]-width) && tutkittavat[i]-width > 0 && !maat[tutkittavat[i]-width].classList.contains("seina"))
        {
          uudet.push(tutkittavat[i]-width)
        }
      }

      //Katsoo voiko vasemmalle menna
      for (let i = 0; i < tutkittavat.length; i++) {
        if (!vanhat.includes(tutkittavat[i]-1) && !uudet.includes(tutkittavat[i]-1) && tutkittavat[i] % width != 0 && ! maat[tutkittavat[i]-1].classList.contains("seina"))
        {
          uudet.push(tutkittavat[i]-1)
        }
      }

      //katsoo voiko oikealle menna
      for (let i = 0; i < tutkittavat.length; i++) {
        if (!vanhat.includes(tutkittavat[i]+1) && !uudet.includes(tutkittavat[i]+1) && tutkittavat[i] % width != width-1 && ! maat[tutkittavat[i]+1].classList.contains("seina"))
        {
          uudet.push(tutkittavat[i]+1)
        }
      }

      listanPituus = vanhat.length

      //Liikuttaa tutkittavat vanhoihin
      for (let i = 0; i < tutkittavat.length;) {
        vanhat.push(tutkittavat[i])
        tutkittavat.shift()
      }

      //Liikuttaa uudet tutkittaviin
      for (let i = 0; i < uudet.length;) {
        tutkittavat.push(uudet[i])
        uudet.shift()
      }

      let valilista = []

      //Pistaa valilistaan vanhoista uudet
      for (let i = 0; i < vanhat.length-listanPituus; i++) {
        valilista.unshift(vanhat[listanPituus+i])
      }
      //Tekee valilistasta uuden listan ja tunkee valmiit listaan
      valmiit.push(Array.from(valilista))

      //tyhjentaa valilistan
      for (let i = 0; i < valilista.length;) {
        valilista.pop()
      }
      y++
    }
    valmiit.reverse()

    let reitti = []
    let kohta = kohde

    for (let i = 0; i < valmiit.length; i++) {
      for (let y = 0; y < valmiit[i].length; y++) {
        //alas
        if (kohta+width == valmiit[i][y]) {
          reitti.unshift(valmiit[i][y])
          kohta = valmiit[i][y]
        }
        //ylos
        if (kohta-width == valmiit[i][y]) {
          reitti.unshift(valmiit[i][y])
          kohta = valmiit[i][y]
        }
        //vasen
        if (kohta-1 == valmiit[i][y] && kohta % width != 0) {
          reitti.unshift(valmiit[i][y])
          kohta = valmiit[i][y]
        }
        //oikea
        if (kohta+1 == valmiit[i][y] && kohta % width != width-1 ) {
          reitti.unshift(valmiit[i][y])
          kohta = valmiit[i][y]
        }
      }
    }

    reitti.push(kohde)
    console.log(reitti)

    //lisää värin
    for (let i = 0; i < reitti.length; i++) {
      maat[reitti[i]].classList.add("reitti")
    }

  console.log(valmiit)
  console.log(reitti)
  }

  etsiReitti(aloitus, loppu)

})