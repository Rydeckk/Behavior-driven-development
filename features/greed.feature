Feature: Calcul du score du jeu Greed

  Scenario Outline: Score d'un lancer de dés
    Given un lancer de dés <lancer>
    When je calcule le score
    Then le score doit être <score>

    Examples:
      | lancer               | score | description            |
      | "[1, 4, 2, 4, 6, 3]" |   100 | un seul 1              |
      | "[5, 4, 2, 4, 6, 3]" |    50 | un seul 5              |
      | "[1, 1, 1, 3, 4, 6]" |  1000 | triple 1               |
      | "[1, 4, 1, 1, 4, 1]" |  2000 | quadruple 1            |
      | "[1, 1, 1, 1, 4, 1]" |  4000 | cinq 1                 |
      | "[1, 1, 1, 1, 1, 1]" |  8000 | six 1                  |
      | "[3, 5, 5, 3, 5, 6]" |   500 | triple 5               |
      | "[6, 2, 2, 3, 2, 6]" |   200 | triple 2               |
      | "[3, 4, 3, 3, 2, 6]" |   300 | triple 3               |
      | "[4, 4, 4, 3, 6, 6]" |   400 | triple 4               |
      | "[4, 4, 6, 3, 6, 6]" |   600 | triple 6               |
      | "[3, 2, 1, 4, 6, 5]" |  1200 | suite 1 à 6            |
      | "[2, 3, 4, 6, 6, 4]" |     0 | aucun score            |
      | "[2, 2, 2, 3, 5, 6]" |   250 | triple 2 + un 5        |
      | "[2, 2, 2, 3, 4, 6]" |   200 | triple 2               |
      | "[6, 2, 2, 5, 1, 2]" |   350 | triple 2 + un 5 + un 1 |
      | "[4, 2, 4, 5, 5, 2]" |   800 | trois paires           |
      | "[4, 4, 4, 5, 4, 1]" |   950 | quadruple 4 un 5 un 1  |
      | "[1, 1, 1, 1, 5, 1]" |  4050 | cinq 1 un 5            |
