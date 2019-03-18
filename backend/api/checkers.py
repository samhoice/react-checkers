
class Checkers:
    adjacency_matrix = {
        0:  {'b': (None, None), 'f': (None, 4)},
        1:  {'b': (None, None), 'f': (4, 5)},
        2:  {'b': (None, None), 'f': (5, 6)},
        3:  {'b': (None, None), 'f': (6, 7)},
        4:  {'b': (0, 1),   'f': (8, 9)},
        5:  {'b': (1, 2),   'f': (9, 10)},
        6:  {'b': (2, 3),   'f': (10, 11)},
        7:  {'b': (3, None), 'f': (11, None)},
        8:  {'b': (None, 4), 'f': (None, 12)},
        9:  {'b': (4, 5),   'f': (12, 13)},
        10: {'b': (5, 6),   'f': (13, 14)},
        11: {'b': (6, 7),   'f': (14, 15)},
        12: {'b': (8, 9),   'f': (16, 17)},
        13: {'b': (9, 10),  'f': (17, 18)},
        14: {'b': (10, 11), 'f': (18, 19)},
        15: {'b': (11, None), 'f': (19, None)},
        16: {'b': (None, 12), 'f': (None, 20)},
        17: {'b': (12, 13), 'f': (20, 21)},
        18: {'b': (13, 14), 'f': (21, 22)},
        19: {'b': (14, 15), 'f': (22, 23)},
        20: {'b': (16, 17), 'f': (24, 25)},
        21: {'b': (17, 18), 'f': (25, 26)},
        22: {'b': (18, 19), 'f': (26, 27)},
        23: {'b': (19, None), 'f': (27, None)},
        24: {'b': (None, 20), 'f': (None, 28)},
        25: {'b': (20, 21), 'f': (28, 29)},
        26: {'b': (21, 22), 'f': (29, 30)},
        27: {'b': (22, 23), 'f': (30, 31)},
        28: {'b': (24, 25), 'f': (None, None)},
        29: {'b': (25, 26), 'f': (None, None)},
        30: {'b': (26, 27), 'f': (None, None)},
        31: {'b': (27, None), 'f': (None, None)}
    }

    FORWARD = 'f'
    BACK = 'b'
    LEFT = 0
    RIGHT = 1

    class Pieces:
        RED = 'w'
        BLACK = 'b'
        RED_KING = 'W'
        BLACK_KING = 'B'
        NONE = ' '

    piece_mapping = {
        ' ': 1,
        'w': 2,
        'b': 3,
        'W': 4,
        'B': 5,
    }

    pos_mapping = {
        0: (0, 0),
        1: (2, 0),
        2: (4, 0),
        3: (6, 0),
        4: (1, 1),
        5: (3, 1),
        6: (5, 1),
        7: (7, 1),
        8: (0, 2),
        9: (2, 2),
        10: (4, 2),
        11: (6, 2),
        12: (1, 3),
        13: (3, 3),
        14: (5, 3),
        15: (7, 3),
        16: (0, 4),
        17: (2, 4),
        18: (4, 4),
        19: (6, 4),
        20: (1, 5),
        21: (3, 5),
        22: (5, 5),
        23: (7, 5),
        24: (0, 6),
        25: (2, 6),
        26: (4, 6),
        27: (6, 6),
        28: (1, 7),
        29: (3, 7),
        30: (5, 7),
        31: (7, 7),
    }

    rev_pos_mapping = {
        0: {0: 0,
            2: 8,
            4: 16,
            6: 24},
        1: {1: 4,
            3: 12,
            5: 20,
            7: 28},
        2: {0: 1,
            2: 9,
            4: 17,
            6: 25, },
        3: {1: 5,
            3: 13,
            5: 21,
            7: 29},
        4: {0: 2,
            2: 10,
            4: 18,
            6: 26},
        5: {1: 6,
            3: 14,
            5: 22,
            7: 30, },
        6: {0: 3,
            2: 11,
            4: 19,
            6: 27, },
        7: {1: 7,
            3: 15,
            5: 23,
            7: 31, },
    }

    base_layout = "bbbbbbbbbbbb        wwwwwwwwwwww"

    @classmethod
    def toGrid(cls, layout, reverse=False):
        if reverse:
            layout = layout[::-1]
        board = [[0 for x in range(8)] for y in range(8)]
        for i, c in enumerate(layout):
            x, y = cls.pos_mapping[i]
            board[y][x] = cls.piece_mapping[c]
        return(board)

    @classmethod
    def colorCurrentlyMoving(cls, move):
        if move % 2:
            return cls.Pieces.RED
        else:
            return cls.Pieces.BLACK

    @staticmethod
    def getColorAt(position, layout):
        return layout[position].lower()

    def isKing(position, layout):
        return layout[position].isupper()

    @classmethod
    def validPiece(cls, layout, piece, move):
        if piece < 0 or piece > 31:
            return False
        if move < 0:
            return None

        color = cls.getColorAt(piece, layout)

        if (color != cls.Pieces.NONE and
                color == cls.colorCurrentlyMoving(move)):
            return True

        return False

    @classmethod
    def getMoves(cls, position, direction):
        """ adjacency matrix lookup
        """
        return cls.adjacency_matrix[position][direction]

    @classmethod
    def getLeftOf(cls, position, direction='f'):
        return cls.adjacency_matrix[position][direction][0]

    @classmethod
    def getRightOf(cls, position, direction='f'):
        return cls.adjacency_matrix[position][direction][1]

    @classmethod
    def isOpponent(cls, color, piece, layout):
        square = cls.getColorAt(piece, layout)
        if square == color.lower() or square != cls.Pieces.NONE:
            return False
        else:
            return True

    @classmethod
    def canJump(cls, target, piece, layout):
        """ returns the landing for the jump or None
        """
        # figure out the jump direction. Assume that the target is
        # legal as far as going forard/backward and don't check color
        # or king status
        if target == cls.adjacency_matrix[piece][cls.FORWARD][cls.LEFT]:
            landing_sq = cls.adjacency_matrix[target][cls.FORWARD][cls.LEFT]
        elif target == cls.adjacency_matrix[piece][cls.FORWARD][cls.RIGHT]:
            landing_sq = cls.adjacency_matrix[target][cls.FORWARD][cls.RIGHT]
        elif target == cls.adjacency_matrix[piece][cls.BACK][cls.LEFT]:
            landing_sq = cls.adjacency_matrix[target][cls.BACK][cls.LEFT]
        elif target == cls.adjacency_matrix[piece][cls.BACK][cls.RIGHT]:
            landing_sq = cls.adjacency_matrix[target][cls.BACK][cls.RIGHT]

        # check if there's an unoccupied square to land in
        if landing_sq == cls.Pieces.NONE:
            return landing_sq

        return None

    @classmethod
    def getLegalMoves(cls, layout, piece):
        """ Gets the legal moves for a piece on the board
        """
        color = cls.getColorAt(piece, layout)
        if color == 'w':
            direction = 'b'
        else:
            direction = 'f'

        unfiltered_moves = []

        if cls.isKing(piece, layout):
            left, right = cls.adjacency_matrix[piece]['f']
            unfiltered_moves.extend([left, right])
            left, right = cls.adjacency_matrix[piece]['b']
            unfiltered_moves.extend([left, right])
        else:
            left, right = cls.getMoves(piece, direction)
            unfiltered_moves.extend([left, right])

        # remove None destinations from the list (board edges)
        filtered_moves = list(filter(lambda x: x, unfiltered_moves))

        # move destination is an opponent
        possible_jumps = list(
            filter(
                lambda x: cls.isOpponent(color, x, layout),
                filtered_moves
            )
        )
        if possible_jumps:
            # process jumps first because you MUST jump

            # TODO for each jump, find the direction and then go two hops
            # and look for an empty square.
            unfiltered_jumps = list(
                map(lambda x: cls.canJump(x, piece, layout), possible_jumps))
            jumps = list(filter(lambda x: x, unfiltered_jumps))
            # we don't care about moves if we have jumps
            if jumps:
                return jumps

        # if we got here, process moves
        moves = list(
            filter(
                lambda x: cls.Pieces.NONE == cls.getColorAt(x, layout),
                filtered_moves
            )
        )
        return {'moves': list(moves)}

    @classmethod
    def getAllLegalMoves(cls, layout, move):
        all_moves = {}
        for i, piece in enumerate(layout):
            if cls.validPiece(layout, i, move):
                moves_for_square = cls.getLegalMoves(layout, i)
                if 'jumps' in moves_for_square:
                    all_moves[i] = moves_for_square
                elif moves_for_square['moves']:
                    all_moves[i] = moves_for_square

        return all_moves

    def movePiece(cls, layout, start, end):
        """ Moves a piece

        I suppose that I should test for a valid move before I go about
        moving pieces all willy-nilly.
        """
        legal_moves = getLegalMoves(layout, start)
        if end in legal_moves:
            piece = layout[start]
            new_layout = layout[0:start] + "1" + layout[start+1:]
            new_layout = layout[0:end] + piece + layout[end+1:]
            return new_layout
        return None

        

if __name__ == "__main__":
    import argparse
    import pprint
    parser = argparse.ArgumentParser()
    subparser = parser.add_subparsers(title="commands", dest="command")
    parser.add_argument("-f", "--filename", help="Name of game file to load")

    # SHOW: for displaying
    parse_show = subparser.add_parser(
        "show", help="Display info about the game")
    parse_show.add_argument("what", help="all, move, or board")
    parse_show.add_argument(
        "-r",
        "--reverse",
        help="reverse the board for red",
        action="store_true")

    parse_new = subparser.add_parser("new", help="New game file")
    parse_new.add_argument("new_file", help="filename of new game")

    parse_moves = subparser.add_parser("moves", help="Get moves for a piece")
    parse_moves.add_argument("piece", help="The piece to move")

    args = parser.parse_args()

    if args.filename:
        f = open(args.filename)
        layout = f.readline().rstrip()
        move = int(f.readline())
    else:
        layout = Checkers.base_layout
        move = 0

    if args.command == "show":
        if args.what == "all" or args.what == "move":
            print("Move: {}".format(move))
        if args.what == "all" or args.what == "board":
            board = Checkers.toGrid(layout, args.reverse)
            if args.reverse:
                print("Board Reversed")
            # reverse the board for printing
            # board is printed top to bottom, stored bottom to top
            board.reverse()
            pprint.pprint(board)
    elif args.command == "new":
        f = open(args.new_file, 'w')
        f.write("{}\n".format(Checkers.base_layout))
        f.write("{}\n".format(0))
    elif args.command == "moves":
        if args.piece.rstrip() == 'all':
            print(Checkers.getAllLegalMoves(layout, move))
        elif not Checkers.validPiece(layout, int(args.piece), move):
            print("You can't move that piece")
        else:
            print(Checkers.getLegalMoves(layout, int(args.piece)))

    else:
        # never gets here because the parser throws an error
        print("Invalid command: {}".format(args.command))
