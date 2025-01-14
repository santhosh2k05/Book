import React from "react";
import { Card, Button } from "flowbite-react";

const PlacementOpportunities = () => {
  
  const opportunities = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      salary: "₹40,00,000",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1662947190722-5d272f82a526?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29vZ2xlJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      company: "Amazon",
      position: "Front-end Developer",
      salary: "₹25,00,000",
      location: "Hyderabad, India",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfZOQHseAcDN2GAeXIyjtvMi6yZEN7XrLHw&s",
    },
    {
      id: 3,
      company: "Microsoft",
      position: "Cloud Architect",
      salary: "₹30,00,000",
      location: "Pune, India",
      image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RWCZER-Legal-IP-Trademarks-CP-MS-logo-740x417-1?wid=406&hei=230&fit=crop",
    },
    {
      id: 4,
      company: "Zoho",
      position: "System Analyst",
      salary: "₹12,00,000",
      location: "Chennai, India",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB7FBMVEX////pOjOk0aCi0O/Yeyf91wBuuV8dm0d8GBYhmdXyqR/zrR7QICrEICzNICrKICr3vBoRkkrtmiHWHynBICwHiUv+5X/wpB8QbKoPca8YlkkUlErDICz1sR3yqx8bmUkWfLvslyL5whrvoCAZf74TZKH+43X80x0Qjkr3uB3//PGezprTAAAdh8YAb7H0rgBjtVLoKB/x9/sAYqXvnAAAl93ys1noLyZ2AAAAljr77/D3twDypgDe7eS5AA/wrlrK5MjqQzz2vLp7v27D4PTucW2j0cZFqFik0a/VABMAlDLl7vbPDBvZWV9tptAwjcX23N3S59kAgjkAWZvbhz+6ABfovcC3AADnjSSMx4S527PS6M70rqzwhYLtZWHPPTioHhnymZaPEQv1sa/fz87KqqrrVVC0h4e02fK2PDmdYWF1uuWXJiNBpduJKih9v4b+7abZxMRfsnH+9MTWdCj/+uKi0NyOweb920S7k5NitHmjamqQSUiLxZvmh4tJnL9zs7P4x1761o374LD5z3f62qT4wTodjqHFzrZ7kFM9pGEcj5F0dz94WzMakX56OCQPkWlwq1nYaW/zrj3OPUZyl0/ds0PCrmR3ZTetqYOKpZiBpchoobD1xIdusonUb3XIq19fjLipvtSEu56JhJH6AAAP50lEQVR4nO2b+1+T1xnAI1rul3GxuSAkLbBiwKQmlJqQUECKgQQSYgNe0I7ZOlrFdl0pG6u0irqVdasDtnVlwsB/dOf6nHPe9w0SLx/tPs/3B5X3vIF8eZ7zPOecvLpcCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgSBGCF4de9lt4wVw6W9YzlHzZ7+JFUl5eVtbTc+n/1/Hy2+U9ZYSesumX/VZeEBfLyy+WlXHHyy/7zbwIkm+Xl58tK5OOQy/7/Twj8ZztUlk5oacMHHuGgi/hjT0H4jNzV64On/7QNkAFZZoKx59b0cmNzF+5/u7p0+++e+TIkV9ZRy+9TQ3Plhn8XBzjxO394dPCjfPruOWmsyyG5WUWXvWiE89dm7/6runGOfOReeflt8ttaSqT9ZV0jNPpdv0IzckjTlw/87H5govlxQxfuaJDUnLu/etHHMKm8+GZ3xivSooQ2tP0ORSdSHp0dOFo+hnFXGK6QSk5mE/OfGq8tkwKav3i2YsOV+PcWHhWvyvDTtOtGDcrbxmvhhA6pqksOoddzUXSmppg8eizGg4f0o0xfKvyjP7iIWV47txnBzg+oehQtQWLmqBq+RkF46dLMqysPKOvas6CYHlFRaxipbhjkaITsQfN5EbVonb7568/gV+avE5eM1KS4YfE8LfqB05rIaxgfFFsOlqKTuSJajJJdcPPXyuRY+RF84edgYxPiKHWLnr0EArWizqKonNINZmkVVWRpxa8QA2vlmR4kxiqdhG0hZASO3BCJl2Ht2NJWlUl28XvShVs+pIaDpciSApNpdYuLilDf4VGzF/UsedSuiTDxaqqd4ThUqmC7V8eI4a5UgsNAQzLHZJUUrTolJChR1mSVi08neBJInjsKQpNpWoXQ45JCoF0Ljo9X5WapFWsIQZLFXyTCh4rpdAMDx8Z/oQZyrX3xQNCyBzXnZJ17NB6y8tTi9TwxtMIvsUEieHVw6kND9c2E7aYoWgXyWIhjHGKFJ3UIdRuTGWzAa83FKKCrF38/rW3SuPYMWF4YAiZ2nAzk2M0MMM/FG8VxM6/khoipD5bp5LkS2uaPkHtVGcg5JUwwyoSwjeBXyhOCtqAGkp7TXt7x5fCsEihsakJ6m9Rwz/yVlFuD2Es9pm2BE2mzsXsqwCniUjMSNQ6AzrMMMsMI7rhm3ZD3bKG45YxnLEZOqtJWAy/trYK8Ltt3UYM+WO2ojNmqi1mT+liIQIIejuZYdo5hgcIKkOt0DC1YSWTyYz3UsZ1w1uqXdhCGPvCaZuUmrCuAlKsiDC1TgMmuDya3g94haCI4ahmeDhBZfg+qNUabuO9zZOrIzl6JjOnK95kQaSXL1u7/UTKwY8wbVsFLJ7SMAUDrLtHAuZEXFCGjoJtFsH29nYwvH5EV+NutZOr12a086Z5qVhb29wC7cLaKmJDzoJkOsJ6Z4Uf/n8j5QIBawT3+Uv2Za3xsHaxDIa64AAhHB4YsEWQCLZ3SMMtPQXHx7d252asZ2mueC9x44h28bG9VcQO2AAmY1Bqv7hNFL/lftnlhaPZgBHBkFigRcCwijfEoFWQiN25u0a5f+9BOGwRrK4GwysZTXDeJsfZUob1zJCsvcvMOmNJ0WTSmJLTE8YqIMUEp9jQVEATDITkNiIrDbO8IQZNwYGBe0va91+62xY2BZWhNsnG7ef1go2MNKzl7eJT/fSChjB2W/dZqZiYmPDrfeO2imJFzPcZMxRDnYah3EZMGYZVzFAL4F3bbvp+OKwLKsMZMMysFhN0rSrDWlZqvrbuKvza3SsTFaL0rKtAGmue4yqELtdyQAkGQqPi6rZMU9Yu3okE9QA+0OMnCd5JaILKMAeG4yOHMZTFVJ1enPP7/RMqXEmiK6mYGJKXUzG46o/9iRrK05eFgBKESgOlxsMN05rhwL0ib/N+Qgkqw7ich7WZucMY1vK195+1EBKTFU3Qr6MUteutp/QYpkNKMBDaFldHo8KQt4vRoBK8W/R9riVqhKBbGbrqZRVp3tJvjudGVidlVHVD3i6+M0IYUyFcNw39FXJgBwYq/sIrqRiIBLTFmndPXpWGvJgeBcMDBKmiENQNJ+HdZ3bj4LaV6c1keqXhhvgt1NfX17J2Ufk9GPrIe16HH3E7Zgr6Y7LGTsNIhWj08jX6atQrvV0hw3BZGg7c0YSCS7Rb6EXnUYJHUMtS17yKT6Z5coO6jWeamRIU1wbqJmGGf1WGPp/q9cmY32ei7OVIxd94u1eNQTcMmO3C4+HF9AbEUPks3Qtz7qwpxf4EE3S7leHIuMrA2ubmZu2LSfGqeK8myNpF5Q+QpERCFdIVqyDRl/V0XV7IivWMLJtTuqFqFx4uKBpiUIRQydwVbZ6QUIENJrigZpjTDQ16ZQivZTRB3i4qpWErMYQ6k4zZBH0wR3e4vf9hJ0/SgPw4Yj+kbZiMdkEFRTEVhkrlXlhbqSU2jTx1G4bxZpsaVxmfly/a0pO0nhv+HULo88Ny5rY9hL6KITGYquDG33by5XYA2oVhCO0iygU9AWaYZEvRAWiE95UgdUxABwkm3IwmMHR92Gx1Y2RkjpJFAbvQwKnn7eIfEEIVJZeDoJqkKT66ng6I/YRqF9qeV28X3NALhidPPgAPU7CmPQHp+8hmONlslWPJ2Axr1MnaBo16vV2ca/W1+vxypk3HfPRr9gf8Bf7UkHw5FJGG0C5CStAbUu3CI2CGo2wzAZ3iLiy128RCpl8OLfVZDecz9Q6oRerIeIPdULSLVoa8M+VrtRMzRxthIWptF166ufcGZGRd0rCLtYuv6HZQJam53aULmQSMsVmoG444GY5fk/fHIT+l4i1oF+ca6ZuGfrDjYOiD0cd01EfmbLaTx1C1C6aW3d4fTcMnFOSqNGTFdJkZQpzC1s1SdeK+HOwngoZhbtxiRyy0VfhGpsECM7xFDddNh3WHEPpg08H8feQfUyKEUDb3lw01wbZhOEUNYRqyOmMIVldDmj7q6zAN4xlNjVMLVcaaow11dQ2qXTRSVAwbWxttqDK0TkaZ77LYEULZdGY/qhsu0hBCwbxn3Q0SoGGsUcMOzZA2A0se1kOVifdqboyGBl5MSbtYFxa6gwWlH/GRL320KC3IPe/Bn+2OyonIi+kDvdDcsQu6q+Xgks3QrJWE3hn4MVv1oFYnh6FdCAufrKUrdkMf9MohYtjK1gZpaQhFxZG0afjPkyfDYLjpIFgt13N2w1XLTNMm4W7GkOP/5kc135M6w8nLRHzskKXwrXZa5Z2RgNjUwyrbkYhRTN/518DJASgm0lATdLtNwzc0wxGLodpFjcxac5Qa8nbxY3m3zETYPuQtet35Mfhe9GuRsrCpt5cXIibrj8tjGP57wB5DKeimggcY5sxiMgudMJcx3aQiK6Y/nusWNKpi2tht0Kh2xql8N/hmhWHIfBQoPbo/teeNnpfee11ckJean3TDO6LPV2uCUGnshvGMHqfCLvzILbsdGJ75rlHqNLbCoiZvKDY2qiB1kxG5NKDHa8ahTHp/m6hFSVskG4qo9N7u4oJdp6jhfwba2qCW3g3bBN1mLW3SDZUJ1SxAHV0tOArW1d1klUaZ5B/rkdIE1UEUC6HM5mWxq4d2sRxVHzZ5o9Amo8KQxfAbYngSJBI2wb5HcpD2wyYjhq6NeqiTdeq0Zma2iGAdK6bruguYDDWCY147aXPR2EJE5WbCC6tsTdDTJZsIaxdEsIsV00XS48NyqgUTVkF3Hyy9+4lgkxnD1YLW7SCEdfYcPcH/oqXmB59mqILoijzupqnamG9U10ghpZd25FdyMwGHMumoEvR4tuEqF+ziBxmbxBAs7tRYBN1uORTso4Km4UgGHArQKSw5yuVOMFroqXeqW8vIvP4o0NjjlZWdMb1OjuWNe9JytwRrb8NQXo10SXhDDLeFYSKuJaANcj+VpGt9TTbD3CCIQCGNz2puNH1PCFoI/JOL1HHlqM6iHJhm96m66oIdr/w1dGqCnqi8zSsNs6whhrU0ZecxmqDqFa7+JruhslG9cLfAwtZQGJydbZnc3WiZrWuR1N0SDytMr4MjpKCdJA+zdsYvz56gXeyFlKAHiumeYfjfcFtNGHp+MGEI9sHeaanPwdClGoFsFfFZ5ra1Oz8joprbAsUTpF2I6ZrcEY55LUQmPIJGlOXZk/UMn3d4KKbbUWFIj2oWw6wHQqiC1czRbSkzrvc6nAw3ZFEpyBXpSItyE+QGwfBm5dcqQo/FhFx3fk42lT/OfgNj2rXlkOMZvljDROHqec3wJ/bBS0KdBwfvJfiRTF9fv/ocQ8xCqyGtKqyUDKo1t51JCOIn5pPQdEIeP676nUZyJX+co1+V7SIk197sDF+u0qLQRKShlxYavlBLaB/KBO/3b25u9j/SL3VIQdPwWkHUycGiH7ARdtVMtD7NPvaQOuaPj5mXaQ5zv7zeO0j/E+cycFSjG3ZBE5GGXawdiqXogY/G94OgaZgbFHXyQMOtFmX4kXVweoc77kBBSY6tSD8yYCyy0/Jhi4C8ElWCZLtkM1ys+grW2puu4rzXB4KmYXxWvPODDOcKmqHDh8UkYDQjyR87hIfdeZmfFLPURuTJmheOajwa50UxhSztyr4TbJN7iURxRSFI/d64YBi6ZBEpFJ2HuY1BJVj3teM9kcfHdSuNvKUKZcXTJNAutnXDLjERoVt0ZW8E9d2g0wekZA5uaoJWQ1lEGnYdXhnPze22DKpJeKIw+Mdiv4gxZ8eHltumpKE82TcMPedZNd2GEJ4PLAT17a5awGisaRlqN1yVGVhnpF88d211sqUwWKiTboXBwa2N1bkDknn6od0xb/3PCMuiw8MJ955h2BX17O11CcHzhKgrqG0mqt0J95ql4KxtmoLS8AMxDnNM7g7juZnVyS3iVjjBzYlbC3GbyRV5XEODTEirovUWeFxGnJmqA26x6QW3Lu8ePUclhtqJDG2C7nsgGVx71NHXZAoKww/kPaqbF1o2djc0Nxq2Qgt9zOYQbuBoTsj8mPUG2C55slQxkjX1okpNlqJgDRxYyLV2X597s5/QQf7VZBXkhiDoiutlhLRGGbZCy+TqtRLUgEhKd7QNp2FD6PFObe+p7CQwtbT1iFgYqs2Su0PRZBdkhh9o30DrBHy2zZYYNjtjMCEf28a059bEOiYaPR/NblM15+8WLCrY1OQkSA11QdHNadjITmJ1buagzn9opsWEdFiwikeePCHqZubjAYZK0CF+ZgQvXDAFXauDJCW3dg9VSUqATEhrt+fshUKhaCiwN0WryGEI8s/nqw8nSA1NQdfMcwqbDbIKcPp/a/tTT4yaSbDfmfeK8rwMEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBXkH+Bw0awb4feC3/AAAAAElFTkSuQmCC",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 min-h-screen text-white">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Placement Opportunities
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:scale-105 transform transition-all duration-300 shadow-lg">
              <img
                src={opportunity.image}
                alt={`${opportunity.company} Logo`}
                className="rounded-t-md h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {opportunity.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Position:</strong> {opportunity.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Salary:</strong> {opportunity.salary}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {opportunity.location}
                </p>
                <div className="mt-4">
                  <Button gradientDuoTone="cyanToBlue" className="w-full">
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
        <Button onClick={() => window.history.back()} gradientDuoTone="cyanToBlue" className="w-full py-4 text-lg">
          Back
        </Button>
      </div>
      </div>
    </div>
  );
};

export default PlacementOpportunities;
