using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace FindAllValidPhoneNumbers
{
  class Program
  {
    /*
        1. Find all valid phone numbers

        Find the number of all valid (and different) phone numbers on a keyboard laid as follows:
        1	2	3
        4	5	6
        7	8	9
        *	0	#

        A valid phone number is defined as:
        The bounce between consecutive digits has always to be a valid “Horse Chess-Move”, for example 1 to 8 or 1 to 6, and so on…
        A phone number should not begin with 0
        A phone number has always 7 digits

        You are allowed to use any programming language you prefer.                        
     */

    static void Main(string[] args)
    {
      var intento2 = new Intento2();
      var stopwatch = new Stopwatch();

      stopwatch.Start();
      intento2.ResolverEjercicio();
      stopwatch.Stop();

      Console.WriteLine($"Tiempo transcurrido: {stopwatch.ElapsedMilliseconds}ms");
    }

    public class Intento2
    {
      public const int CANTIDAD_ESPACIOS_2 = 2;

      public string[,] PadNumerico = new string[,]
      {
                { "1","2","3" },
                { "4","5","6" },
                { "7","8","9" },
                { "*","0","#" },
      };

      public void ResolverEjercicio()
      {
        var primerlistado = new List<string>();
        for (int i = 0; i < PadNumerico.GetLength(0); i++)
        {
          for (int j = 0; j < PadNumerico.GetLength(1); j++)
            primerlistado = primerlistado.Concat(IdentificarMovimientos(i, j)).ToList();
        }

        var ListadoDefinitivo = new List<string>();
        var listaNEGRA = new List<string>();
        foreach (var comienzoNumero in primerlistado)
        {
          var ultimoDigito = comienzoNumero.Substring(3, 1);
          var primerDigito = comienzoNumero.Substring(0, 1);
          var coordenadas = PadNumerico.ObtenerCoordenadasDesdeValor(ultimoDigito);
          var movimientos = IdentificarMovimientos(coordenadas.Item1, coordenadas.Item2);

          foreach (var primeraMitad in primerlistado
              .Where(x => x.Substring(3, 1) == ultimoDigito && x.Substring(0, 1) == primerDigito))
          {
            foreach (var segundaMitad in movimientos)
            {
              var numeroFinal = primeraMitad + segundaMitad.Substring(1, 3);
              if (!ListadoDefinitivo.Contains(numeroFinal) && numeroFinal.Substring(0, 1) != "0")
              {
                ListadoDefinitivo.Add(numeroFinal);
              }
              else
                listaNEGRA.Add(numeroFinal);
            }
          }
        }

        ListadoDefinitivo.Sort();

        foreach (var item in ListadoDefinitivo)
          Console.WriteLine(item);

        Console.WriteLine($"la cantidad Total de numeros es {ListadoDefinitivo.Count}");
        Console.WriteLine($"la cantidad Total DESCARTADA es {listaNEGRA.Count}");
      }

      private List<string> IdentificarMovimientos(int fila, int columna)
      {
        var resultado = new List<string>();

        string numeroInicial = PadNumerico.GetValue(fila, columna).ToString();
        if (numeroInicial == "#" || numeroInicial == "*" || numeroInicial == "5")
          return resultado;

        var camino2Derecha1Abajo = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Derecha, Direcciones.Abajo);
        if (camino2Derecha1Abajo.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Derecha1Abajo);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Derecha1Arriba = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Derecha, Direcciones.Arriba);
        if (camino2Derecha1Arriba.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Derecha1Arriba);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Izquierda1Abajo = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Izquierda, Direcciones.Abajo);
        if (camino2Izquierda1Abajo.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Izquierda1Abajo);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Izquierda1Arriba = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Izquierda, Direcciones.Arriba);
        if (camino2Izquierda1Arriba.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Izquierda1Arriba);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Derecha2Abajo = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Derecha, Direcciones.Abajo);
        if (camino1Derecha2Abajo.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Derecha2Abajo);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Derecha2Arriba = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Derecha, Direcciones.Arriba);
        if (camino1Derecha2Arriba.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Derecha2Arriba);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Izquierda2Abajo = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Izquierda, Direcciones.Abajo);
        if (camino1Izquierda2Abajo.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Izquierda2Abajo);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Izquierda2Arriba = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Izquierda, Direcciones.Arriba);
        if (camino1Izquierda2Arriba.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Izquierda2Arriba);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Abajo1Derecha = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Abajo, Direcciones.Derecha);
        if (camino2Abajo1Derecha.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Abajo1Derecha);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Abajo1Izquierda = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Abajo, Direcciones.Izquierda);
        if (camino2Abajo1Izquierda.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Abajo1Izquierda);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Abajo2Derecha = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Abajo, Direcciones.Derecha);
        if (camino1Abajo2Derecha.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Abajo2Derecha);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Abajo2Izquierda = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Abajo, Direcciones.Izquierda);
        if (camino1Abajo2Izquierda.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Abajo2Izquierda);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Arriba2Derecha = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Arriba, Direcciones.Derecha);
        if (camino1Arriba2Derecha.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Arriba2Derecha);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino1Arriba2Izquierda = RecorrerCamino1Primero2Despues(fila, columna, Direcciones.Arriba, Direcciones.Izquierda);
        if (camino1Arriba2Izquierda.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino1Arriba2Izquierda);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Arriba1Derecha = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Arriba, Direcciones.Derecha);
        if (camino2Arriba1Derecha.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Arriba1Derecha);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        var camino2Arriba1Izquierda = RecorrerCamino2Primero1Despues(fila, columna, Direcciones.Arriba, Direcciones.Izquierda);
        if (camino2Arriba1Izquierda.Any())
        {
          var movimientos = ListarMovimientos(fila, columna, camino2Arriba1Izquierda);

          FormarNumeroYagregarLista(resultado, movimientos);
        }

        return resultado;
      }
      /**************************************************************************************/

      private void FormarNumeroYagregarLista(List<string> resultado, List<KeyValuePair<int, int>> movimientos)
      {
        var numero = FormarNumero(movimientos);
        if (!string.IsNullOrEmpty(numero))
          resultado.Add(numero);
      }
      private static List<KeyValuePair<int, int>> ListarMovimientos(int fila, int columna, List<KeyValuePair<int, int>> caminoRestante)
      {
        var movimientos = new List<KeyValuePair<int, int>>
                {
                    new KeyValuePair<int, int>(fila, columna)
                };
        movimientos = movimientos.Concat(caminoRestante).ToList();
        return movimientos;
      }
      private string FormarNumero(List<KeyValuePair<int, int>> movimientos)
      {
        var numero = string.Empty;
        foreach (var item in movimientos)
          numero = $"{numero}{PadNumerico.GetValue(item.Key, item.Value)}";

        if (numero.Contains("#") || numero.Contains("*"))
          return string.Empty;

        return numero;
      }
      /**************************************************************************************/

      private List<KeyValuePair<int, int>> RecorrerCamino2Primero1Despues(int fila, int columna, Direcciones direccion1, Direcciones direccion2)
      {
        var resultado = new List<KeyValuePair<int, int>>();

        var maximoElementos = ObtenerMaximoElementosSegunDireccion(fila, columna, direccion1);

        var posicionActual = DefinirPosicionActual(ref resultado, maximoElementos);

        var ultimosMovimientos = ObtenerSiguienteElementoSegunDireccion(posicionActual.Key, posicionActual.Value, direccion2);

        return DevolverMovimientosValidos(ref resultado, ultimosMovimientos);
      }
      private List<KeyValuePair<int, int>> RecorrerCamino1Primero2Despues(int fila, int columna, Direcciones direccion1, Direcciones direccion2)
      {
        var resultado = new List<KeyValuePair<int, int>>();

        var posicionActual = ObtenerMovimientoMasCercanoSegunDireccion(resultado, fila, columna, direccion1);

        var ultimosMovimientos = ObtenerMaximoElementosSegunDireccion(posicionActual.Key, posicionActual.Value, direccion2);

        return DevolverMovimientosValidos(ref resultado, ultimosMovimientos);
      }
      private static List<KeyValuePair<int, int>> DevolverMovimientosValidos(ref List<KeyValuePair<int, int>> resultado, List<KeyValuePair<int, int>> ultimosMovimientos)
      {
        if (ultimosMovimientos.Any())
          resultado = resultado.Concat(ultimosMovimientos).ToList();

        if (resultado.Count < 3)
          return new List<KeyValuePair<int, int>>();

        return resultado;
      }
      /**************************************************************************************/
      private KeyValuePair<int, int> ObtenerMovimientoMasCercanoSegunDireccion(List<KeyValuePair<int, int>> resultado, int fila, int columna, Direcciones direccion)
      {
        var maximoElementos = ObtenerMaximoElementosSegunDireccion(fila, columna, direccion);

        if (maximoElementos.Count <= 0)
          return new KeyValuePair<int, int>();

        var posicionActual = maximoElementos.First();
        resultado.Add(posicionActual);
        return posicionActual;
      }
      private static KeyValuePair<int, int> DefinirPosicionActual(ref List<KeyValuePair<int, int>> resultado, List<KeyValuePair<int, int>> maximoElementosAbajo)
      {
        if (maximoElementosAbajo.Count <= 0)
          return new KeyValuePair<int, int>();

        resultado = resultado.Concat(maximoElementosAbajo).ToList();

        var posicionActual = maximoElementosAbajo.Last();

        return posicionActual;
      }
      /*******************************************************************************************/

      private List<KeyValuePair<int, int>> ObtenerMaximoElementosSegunDireccion(int fila, int columna, Direcciones direccion)
      {
        int nuevaFila = 0;
        int nuevaColumna = 0;
        var resultado = new List<KeyValuePair<int, int>>();
        for (int i = 0; i < CANTIDAD_ESPACIOS_2; i++)
        {
          switch (direccion)
          {
            case Direcciones.Abajo:
              nuevaFila = ++fila;
              nuevaColumna = columna;
              break;
            case Direcciones.Arriba:
              nuevaFila = --fila;
              nuevaColumna = columna;
              break;
            case Direcciones.Derecha:
              nuevaColumna = ++columna;
              nuevaFila = fila;
              break;
            case Direcciones.Izquierda:
              nuevaColumna = --columna;
              nuevaFila = fila;
              break;
          }

          if (nuevaFila < PadNumerico.GetLength(0) && nuevaFila >= 0 &&
              nuevaColumna < PadNumerico.GetLength(1) && nuevaColumna >= 0)
            resultado.Add(new KeyValuePair<int, int>(nuevaFila, nuevaColumna));
        }

        return resultado;
      }
      private List<KeyValuePair<int, int>> ObtenerSiguienteElementoSegunDireccion(int fila, int columna, Direcciones direccion)
      {
        int nuevaFila = 0;
        int nuevaColumna = 0;

        var resultado = new List<KeyValuePair<int, int>>();

        switch (direccion)
        {
          case Direcciones.Abajo:
            nuevaFila = ++fila;
            nuevaColumna = columna;
            break;
          case Direcciones.Arriba:
            nuevaFila = --fila;
            nuevaColumna = columna;
            break;
          case Direcciones.Derecha:
            nuevaColumna = ++columna;
            nuevaFila = fila;
            break;
          case Direcciones.Izquierda:
            nuevaColumna = --columna;
            nuevaFila = fila;
            break;
        }

        if (nuevaColumna < PadNumerico.GetLength(1) && nuevaColumna >= 0 &&
            nuevaFila < PadNumerico.GetLength(0) && nuevaFila >= 0)
          resultado.Add(new KeyValuePair<int, int>(nuevaFila, nuevaColumna));

        return resultado;
      }
      /*******************************************************************************************/
      enum Direcciones
      {
        Arriba,
        Abajo,
        Derecha,
        Izquierda
      }
    }
  }
}
