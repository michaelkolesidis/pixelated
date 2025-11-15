/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 *
 */

const TEXTS = {
  en: {
    LOSS_MESSAGE: 'Game over! Out of moves.',
    WINNING_STREAK: 'Winning streak: ',
    MOVES_LEFT: (moves) => `${moves} move${moves === 1 ? '' : 's'} left`,
    WIN_MESSAGE: (moves) =>
      `You won with ${moves === 1 ? '1 move' : `${moves} moves`} left!`,
    HELP_TITLE: 'How to Play',
    HELP_DESCRIPTION:
      'Pixelated is a puzzle-based strategy game that requires a mix of skill and luck.',
    HELP_OBJECTIVE:
      'The objective is to change the color of the squares until the entire screen is a single solid color.',
    HELP_INSTRUCTIONS:
      'Starting with the square in the upper left corner you can change the color of the blocks in order to match that of the surrounding squares. This is done repeatedly until the entire screen is one color. You must do so in under 22 moves to win!',
    HELP_CONTROLS:
      'The game is controlled by the color buttons at the bottom of the screen.',
    BACK_BUTTON: 'Back',
    NEW_BUTTON: 'New',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>Licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a>`,
  },

  es: {
    LOSS_MESSAGE: '¡Juego terminado! No quedan movimientos.',
    WINNING_STREAK: 'Racha de victorias: ',
    MOVES_LEFT: (moves) =>
      `${moves} movimiento${moves === 1 ? '' : 's'} restante${
        moves === 1 ? '' : 's'
      }`,
    WIN_MESSAGE: (moves) =>
      `¡Has ganado con ${
        moves === 1 ? '1 movimiento' : `${moves} movimientos`
      } restante${moves === 1 ? '' : 's'}!`,
    HELP_TITLE: 'Cómo jugar',
    HELP_DESCRIPTION:
      'Pixelated es un juego de estrategia y rompecabezas que requiere una mezcla de habilidad y suerte.',
    HELP_OBJECTIVE:
      'El objetivo es cambiar el color de los cuadros hasta que toda la pantalla sea de un solo color sólido.',
    HELP_INSTRUCTIONS:
      'Comenzando con el cuadro en la esquina superior izquierda, puedes cambiar el color de los bloques para que coincida con el de los cuadros circundantes. Esto se repite hasta que toda la pantalla sea de un solo color. ¡Debes hacerlo en menos de 22 movimientos para ganar!',
    HELP_CONTROLS:
      'El juego se controla con los botones de colores en la parte inferior de la pantalla.',
    BACK_BUTTON: 'Atrás',
    NEW_BUTTON: 'Nuevo',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>Licenciado bajo la <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a>`,
  },

  el: {
    LOSS_MESSAGE: 'Τέλος παιχνιδιού! Δεν υπάρχουν άλλες κινήσεις.',
    WINNING_STREAK: 'Σερί νικών: ',
    MOVES_LEFT: (moves) =>
      `${moves} ${moves === 1 ? 'κίνηση' : 'κινήσεις'} απομέν${
        moves === 1 ? 'ει' : 'ουν'
      }`,
    WIN_MESSAGE: (moves) =>
      `Κέρδισες με ${
        moves === 1 ? '1 κίνηση' : `${moves} κινήσεις`
      } να απομένουν!`,
    HELP_TITLE: 'Πώς να παίξετε',
    HELP_DESCRIPTION:
      'Το Pixelated είναι ένα παιχνίδι στρατηγικής και παζλ που απαιτεί συνδυασμό δεξιοτήτων και τύχης.',
    HELP_OBJECTIVE:
      'Ο στόχος είναι να αλλάζετε τα χρώματα των τετραγώνων μέχρι όλη η οθόνη να γίνει ένα ενιαίο χρώμα.',
    HELP_INSTRUCTIONS:
      'Ξεκινώντας από το τετράγωνο στην επάνω αριστερή γωνία, μπορείτε να αλλάζετε τα χρώματα των μπλοκ ώστε να ταιριάζουν με τα γύρω τετράγωνα. Επαναλάβετε έως ότου ολόκληρη η οθόνη γίνει ένα χρώμα. Πρέπει να το κάνετε σε λιγότερες από 22 κινήσεις για να κερδίσετε!',
    HELP_CONTROLS:
      'Το παιχνίδι ελέγχεται από τα κουμπιά χρωμάτων στο κάτω μέρος της οθόνης.',
    BACK_BUTTON: 'Πίσω',
    NEW_BUTTON: 'Νέο',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>Αδειοδοτημένο υπό <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a>`,
  },

  de: {
    LOSS_MESSAGE: 'Spiel vorbei! Keine Züge mehr.',
    WINNING_STREAK: 'Siegesserie: ',
    MOVES_LEFT: (moves) => `${moves} Zug${moves === 1 ? '' : 'e'} übrig`,
    WIN_MESSAGE: (moves) =>
      `Du hast gewonnen mit ${moves === 1 ? '1 Zug' : `${moves} Zügen`} übrig!`,
    HELP_TITLE: 'Spielanleitung',
    HELP_DESCRIPTION:
      'Pixelated ist ein strategie- und rätselbasierendes Spiel, das eine Mischung aus Geschick und Glück erfordert.',
    HELP_OBJECTIVE:
      'Das Ziel ist es, die Farben der Felder zu ändern, bis der gesamte Bildschirm eine einzige Farbe hat.',
    HELP_INSTRUCTIONS:
      'Ausgehend vom Feld in der oberen linken Ecke kannst du die Farbe der Blöcke ändern, um sie an die umliegenden Felder anzugleichen. Wiederhole dies, bis der ganze Bildschirm eine Farbe hat. Du musst es in weniger als 22 Zügen schaffen, um zu gewinnen!',
    HELP_CONTROLS:
      'Das Spiel wird mit den Farbtasten am unteren Bildschirmrand gesteuert.',
    BACK_BUTTON: 'Zurück',
    NEW_BUTTON: 'Neu',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>Lizenziert unter der <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a>`,
  },

  fr: {
    LOSS_MESSAGE: 'Partie terminée ! Plus de coups restants.',
    WINNING_STREAK: 'Série de victoires : ',
    MOVES_LEFT: (moves) =>
      `${moves} coup${moves === 1 ? '' : 's'} restant${moves === 1 ? '' : 's'}`,
    WIN_MESSAGE: (moves) =>
      `Vous avez gagné avec ${
        moves === 1 ? '1 coup' : `${moves} coups`
      } restant${moves === 1 ? '' : 's'} !`,
    HELP_TITLE: 'Comment jouer',
    HELP_DESCRIPTION:
      'Pixelated est un jeu de stratégie et de réflexion qui demande un mélange d’habileté et de chance.',
    HELP_OBJECTIVE:
      'L’objectif est de changer la couleur des carrés jusqu’à ce que tout l’écran devienne d’une seule couleur.',
    HELP_INSTRUCTIONS:
      'En commençant par le carré en haut à gauche, vous pouvez changer la couleur des blocs pour correspondre à celle des carrés voisins. Répétez jusqu’à ce que tout l’écran soit d’une seule couleur. Vous devez réussir en moins de 22 coups pour gagner !',
    HELP_CONTROLS:
      'Le jeu se contrôle avec les boutons colorés en bas de l’écran.',
    BACK_BUTTON: 'Retour',
    NEW_BUTTON: 'Nouveau',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>Sous licence <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a>`,
  },

  zh: {
    LOSS_MESSAGE: '游戏结束！没有剩余步数。',
    WINNING_STREAK: '连胜次数：',
    MOVES_LEFT: (moves) => `剩余 ${moves} 步`,
    WIN_MESSAGE: (moves) =>
      `你赢了！剩余 ${moves === 1 ? '1 步' : `${moves} 步`}！`,
    HELP_TITLE: '玩法说明',
    HELP_DESCRIPTION: 'Pixelated 是一款融合了策略与运气的益智游戏。',
    HELP_OBJECTIVE: '目标是不断改变方格颜色，直到整个屏幕变成统一的颜色。',
    HELP_INSTRUCTIONS:
      '从左上角的方格开始，你可以改变方块颜色以匹配周围方格。重复此操作直到整个屏幕成为一种颜色。你必须在 22 步以内完成才能获胜！',
    HELP_CONTROLS: '游戏通过屏幕底部的颜色按钮进行控制。',
    BACK_BUTTON: '返回',
    NEW_BUTTON: '新游戏',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/>根据 <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a> 授权`,
  },

  ja: {
    LOSS_MESSAGE: 'ゲームオーバー！残りの手がありません。',
    WINNING_STREAK: '連勝数：',
    MOVES_LEFT: (moves) => `残り ${moves} 手`,
    WIN_MESSAGE: (moves) =>
      `勝利！残り ${moves === 1 ? '1 手' : `${moves} 手`}！`,
    HELP_TITLE: '遊び方',
    HELP_DESCRIPTION:
      'Pixelated は、スキルと運の両方が必要なパズル戦略ゲームです。',
    HELP_OBJECTIVE:
      '画面全体が一つの色になるまで、マス目の色を変えていくのが目的です。',
    HELP_INSTRUCTIONS:
      '左上のマスから始め、周囲のマスと同じ色になるようにブロックの色を変えます。これを繰り返し、画面全体を同じ色にします。22 手以内にクリアすれば勝利です！',
    HELP_CONTROLS: 'ゲームは画面下部のカラーボタンで操作します。',
    BACK_BUTTON: '戻る',
    NEW_BUTTON: '新規',
    COPYRIGHT: `©<a href="https://github.com/michaelkolesidis/pixelated" target="_blank">Michael Kolesidis</a><br/><a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank">GNU AGPL</a> の下でライセンスされています`,
  },
};
