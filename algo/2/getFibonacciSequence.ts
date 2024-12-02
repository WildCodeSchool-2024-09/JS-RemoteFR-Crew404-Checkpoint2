import "./getFibonacciSequence.spec";
/*
Créé une fonction getFibonacciSequence qui prend un nombre n en paramètre et retourne un tableau contenant les n premiers nombres de la suite de Fibonacci.

Détails

* La suite de Fibonacci commence par les nombres 0 et 1.
* Chaque nombre suivant est la somme des deux nombres précédents.
* Par exemple, pour n = 5, la fonction devrait retourner [0, 1, 1, 2, 3].

Si n est inférieur ou égal à 0, la fonction doit retourner un tableau vide []
*/

function getFibonacciSequence(n: number): number[] {
  // pour le retour à 0 si le tableau est vide
  if (n <= 0) {
    return [];
  }

  // lancement des deux nombres O et 1
  const startsequence = [0, 1];
  // retour à zéro si ce n'es pas le cas
  if (n === 1) {
    return [0];
  }

  //nombre = somme des précedents
  for (let i = 2; i < n; i++) {
    startsequence[i] = startsequence[i - 1] + startsequence[i - 2];
  }

  return startsequence.slice(0, n);
}

export default getFibonacciSequence;
