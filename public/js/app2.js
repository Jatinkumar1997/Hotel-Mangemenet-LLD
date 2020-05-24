const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.value)
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
      
      postData('/addRoom', {"rNo" : "A03",
      "rType":"Deluxe",
      "bCount":2,
      "rPrice":2500,
      "aCount":2,
      "cCount":2,
      "hId" : "5ec96dcce7679d66647f49aa"
  }).then(data => {
          console.log(data); // JSON data parsed by `response.json()` call
        });
    // fetch('/getRoomsbyType?type=' + type).then((response) => {
    //     response.json().then((data) => {
    //         console.log(data)
    //         var k = '<tbody>'
    //         for(i = 0;i < data.length; i++){
    //             k+= '<tr>';
    //             k+= '<td>' + data[i].roomNumber + '</td>';
    //             k+= '<td>' + data[i].roomType + '</td>';
    //             k+= '<td>' + data[i].bedsCount + '</td>';
    //             k+= '</tr>';
    //         }
    //         k+='</tbody>';
    //         messageTwo.innerHTML = k
    //     })
    // })
})