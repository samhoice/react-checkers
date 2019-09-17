class Checkers:
    adjacency_matrix = {
        0: {"b": (None, None), "f": (None, 4)},
        1: {"b": (None, None), "f": (4, 5)},
        2: {"b": (None, None), "f": (5, 6)},
        3: {"b": (None, None), "f": (6, 7)},
        4: {"b": (0, 1), "f": (8, 9)},
        5: {"b": (1, 2), "f": (9, 10)},
        6: {"b": (2, 3), "f": (10, 11)},
        7: {"b": (3, None), "f": (11, None)},
        8: {"b": (None, 4), "f": (None, 12)},
        9: {"b": (4, 5), "f": (12, 13)},
        10: {"b": (5, 6), "f": (13, 14)},
        11: {"b": (6, 7), "f": (14, 15)},
        12: {"b": (8, 9), "f": (16, 17)},
        13: {"b": (9, 10), "f": (17, 18)},
        14: {"b": (10, 11), "f": (18, 19)},
        15: {"b": (11, None), "f": (19, None)},
        16: {"b": (None, 12), "f": (None, 20)},
        17: {"b": (12, 13), "f": (20, 21)},
        18: {"b": (13, 14), "f": (21, 22)},
        19: {"b": (14, 15), "f": (22, 23)},
        20: {"b": (16, 17), "f": (24, 25)},
        21: {"b": (17, 18), "f": (25, 26)},
        22: {"b": (18, 19), "f": (26, 27)},
        23: {"b": (19, None), "f": (27, None)},
        24: {"b": (None, 20), "f": (None, 28)},
        25: {"b": (20, 21), "f": (28, 29)},
        26: {"b": (21, 22), "f": (29, 30)},
        27: {"b": (22, 23), "f": (30, 31)},
        28: {"b": (24, 25), "f": (None, None)},
        29: {"b": (25, 26), "f": (None, None)},
        30: {"b": (26, 27), "f": (None, None)},
        31: {"b": (27, None), "f": (None, None)},
    }

    FORWARD = "f"
    BACK = "b"
    LEFT = 0
    RIGHT = 1

    class Pieces:
        RED = "w"
        BLACK = "b"
        RED_KING = "W"
        BLACK_KING = "B"
        NONE = " "

    piece_mapping = {" ": 1, "w": 2, "b": 3, "W": 4, "B": 5}

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
        0: {0: 0, 2: 8, 4: 16, 6: 24},
        1: {1: 4, 3: 12, 5: 20, 7: 28},
        2: {0: 1, 2: 9, 4: 17, 6: 25},
        3: {1: 5, 3: 13, 5: 21, 7: 29},
        4: {0: 2, 2: 10, 4: 18, 6: 26},
        5: {1: 6, 3: 14, 5: 22, 7: 30},
        6: {0: 3, 2: 11, 4: 19, 6: 27},
        7: {1: 7, 3: 15, 5: 23, 7: 31},
    }

    base_layout = "bbbbbbbbbbbb        wwwwwwwwwwww"

    @classmethod
    def _toGrid(cls, layout, reverse=False):
        if reverse:
            layout = layout[::-1]
        board = [[0 for x in range(8)] for y in range(8)]
        for i, c in enumerate(layout):
            x, y = cls.pos_mapping[i]
            board[y][x] = cls.piece_mapping[c]
        return board

    @classmethod
    def _colorCurretlyMoving(cls, move):
        if move % 2:
            return cls.Pieces.RED
        else:
            return cls.Pieces.BLACK

    @staticmethod
    def _getColorAt(position, layout):
        return layout[position].lower()

    @staticmethod
    def _isKing(position, layout):
        return layout[position].isupper()

    @classmethod
    def validPiece(cls, piece, layout, move):
        if piece < 0 or piece > 31:
            return False
        if move < 0:
            return None

        color = cls._getColorAt(piece, layout)

        if color != cls.Pieces.NONE and color == cls._colorCurretlyMoving(move):
            return True

        return False

    @classmethod
    def _getMoves(cls, position, direction):
        """ adjacency matrix lookup
        """
        return cls.adjacency_matrix[position][direction]

    @classmethod
    def _getLeftOf(cls, position, direction="f"):
        return cls.adjacency_matrix[position][direction][0]

    @classmethod
    def _getRightOf(cls, position, direction="f"):
        return cls.adjacency_matrix[position][direction][1]

    @classmethod
    def _isOpponent(cls, color, position, layout):
        square = cls._getColorAt(position, layout)
        if square == cls.Pieces.NONE or color == square.lower():
            return False
        else:
            return True

    @classmethod
    def _canJump(cls, target, piece, layout):
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
        if cls._getColorAt(landing_sq, layout) == cls.Pieces.NONE:
            return landing_sq

        return None

    @classmethod
    def getLegalMoves(cls, piece, layout):
        """ Gets the legal moves for a piece on the board
        """
        color = cls._getColorAt(piece, layout)
        if color == "w":
            direction = "b"
        else:
            direction = "f"

        unfiltered_moves = []

        if cls._isKing(piece, layout):
            left, right = cls.adjacency_matrix[piece]["b"]
            unfiltered_moves.extend([left, right])
            left, right = cls.adjacency_matrix[piece]["f"]
            unfiltered_moves.extend([left, right])
        else:
            left, right = cls._getMoves(piece, direction)
            unfiltered_moves.extend([left, right])

        # remove None destinations from the list (board edges)
        filtered_moves = list(filter(lambda x: x, unfiltered_moves))

        # move destination is an opponent
        possible_jumps = list(
            filter(lambda x: cls._isOpponent(color, x, layout), filtered_moves)
        )
        if possible_jumps:
            # process jumps first because you MUST jump

            # TODO for each jump, find the direction and then go two hops
            # and look for an empty square.
            unfiltered_jumps = list(
                map(lambda x: cls._canJump(x, piece, layout), possible_jumps)
            )
            jumps = list(filter(lambda x: x, unfiltered_jumps))
            # we don't care about moves if we have jumps
            if jumps:
                return {"jumps": jumps}

        # if we got here, process moves
        moves = list(
            filter(
                lambda x: cls.Pieces.NONE == cls._getColorAt(
                    x, layout), filtered_moves
            )
        )
        return {"moves": list(moves)}

    @classmethod
    def XYToIdx(cls, pos):
        """ returns the index position from the X, Y coord
        """
        return cls.rev_pos_mapping[int(pos[0])][int(pos[1])]

    @classmethod
    def IdxToXY(cls, idx):
        pos = cls.pos_mapping[int(idx)]

        return "{}{}".format(pos[0], pos[1])

    @classmethod
    def getAllLegalMoves(cls, layout, move):
        has_jumps = False
        all_moves = {}
        for i, piece in enumerate(layout):
            if cls.validPiece(i, layout, move):
                moves_for_square = cls.getLegalMoves(i, layout)
                if "jumps" in moves_for_square:
                    if not has_jumps:
                        all_moves = {}
                        has_jumps = True
                    all_moves[i] = moves_for_square

                elif not has_jumps and moves_for_square["moves"]:
                    all_moves[i] = moves_for_square

        return all_moves

    @classmethod
    def movePiece(cls, layout, start, end, move):
        """ Moves a piece

        returns a tuple, (new move number, new layout)
        """
        print("Checkers.movePiece")
        print("start {} end {}".format(start, end))
        if not Checkers.validPiece(start, layout, move):
            print("piece not valid, returning")
            return (None, None)

        print("start: {} layout: {}".format(start, layout))
        legal_moves = cls.getLegalMoves(start, layout)
        if 'moves' in legal_moves and end in legal_moves["moves"]:
            print("legal move")
            piece = layout[start]
            new_layout = layout[0:start] + " " + layout[start + 1:]
            new_layout = new_layout[0:end] + piece + new_layout[end + 1:]
            return (move + 1, new_layout)
        print("not a legal move")
        return (None, None)

    @classmethod
    def jumpPiece(cls, layout, start, end, move):
        """ Jump a piece

        returns a tuple, (new move number, new layout)
        move number might not change if there are more required jumps
        """
        if not Checkers.validPiece(start, layout, move):
            return (None, None)

        legal_moves = cls.getLegalMoves(start, layout)
        if 'jumps' not in legal_moves:
            return (None, None)
        if end in legal_moves["jumps"]:
            piece = layout[start]
            d = start - end
            # forwards or back
            fb = cls.FORWARD if (start < end) else cls.BACK
            # jumped square
            if fb == cls.FORWARD and abs(d) == 9:
                lr = cls.RIGHT
            elif fb == cls.BACK and abs(d) == 7:
                lr = cls.RIGHT
            else:
                lr = cls.LEFT
            jumped_sq = cls.adjacency_matrix[start][fb][lr]
            print(
                "jump: {} forward:{} right:{}".format(
                    jumped_sq, fb == cls.FORWARD, lr == cls.RIGHT
                )
            )
            new_layout = layout[0:start] + " " + layout[start + 1:]
            new_layout = new_layout[0:jumped_sq] + \
                " " + new_layout[jumped_sq + 1:]
            new_layout = new_layout[0:end] + piece + new_layout[end + 1:]

            new_legal_moves = Checkers.getLegalMoves(
                int(args.target), new_layout)
            if "jumps" not in new_legal_moves:
                move = move + 1

            return (move, new_layout)
        return None


if __name__ == "__main__":
    import argparse
    import pprint

    def write_board(filename, layout, move):
        f = open(filename, "w")
        f.write("{}\n".format(layout))
        f.write("{}\n".format(move))
        f.close()

    parser = argparse.ArgumentParser()
    subparser = parser.add_subparsers(title="commands", dest="command")
    parser.add_argument("-f", "--filename", help="Name of game file to load")

    # SHOW: for displaying
    parse_show = subparser.add_parser(
        "show", help="Display info about the game")
    parse_show.add_argument("what", help="all, move, or board")
    parse_show.add_argument(
        "-r", "--reverse", help="reverse the board for red", action="store_true"
    )

    parse_new = subparser.add_parser("new", help="New game file")
    parse_new.add_argument("new_file", help="filename of new game")

    parse_getmoves = subparser.add_parser(
        "lsmv", help="List moves for a piece")
    parse_getmoves.add_argument("piece", help="The piece to move")

    parse_makemove = subparser.add_parser("move", help="Make a move")
    parse_makemove.add_argument("piece", help="The piece to move")
    parse_makemove.add_argument("target", help="The square onto which to move")

    parse_jump = subparser.add_parser("jump", help="Make a jump")
    parse_jump.add_argument("piece", help="The piece to move")
    parse_jump.add_argument("target", help="The square onto which to move")

    args = parser.parse_args()

    if args.filename:
        f = open(args.filename)
        layout = f.readline().rstrip()
        move = int(f.readline())
        f.close()
    else:
        layout = Checkers.base_layout
        move = 0

    if args.command == "show":
        if args.what == "move":
            print("Move: {}".format(move))
        elif args.what == "all" or args.what == "board":
            if args.what == "all":
                print("Move: {}".format(move))
            board = Checkers._toGrid(layout, args.reverse)
            if args.reverse:
                print("Board Reversed")
            # reverse the board for printing
            # board is printed top to bottom, stored bottom to top
            board.reverse()
            pprint.pprint(board)
        else:
            print("Invalid target")
    elif args.command == "new":
        # new layout
        write_board(args.new_file, Checkers.base_layout, 0)
    elif args.command == "lsmv":
        # get the moves for a piece (or all pieces)
        if args.piece.rstrip() == "all":
            print(Checkers.getAllLegalMoves(layout, move))
        elif not Checkers.validPiece(int(args.piece), layout, move):
            print("You can't move that piece")
        else:
            print(Checkers.getLegalMoves(int(args.piece), layout))
    elif args.command == "move":
        # make a move
        (move_num, new_layout) = Checkers.movePiece(
            layout, int(args.piece), int(args.target), move)
        if not new_layout:
            print("Invalid move")
            parse_makemove.print_help()
        else:
            write_board(
                args.filename,
                new_layout,
                move_num
            )
    elif args.command == "jump":
        (move_num, new_layout) = Checkers.jumpPiece(
            layout, int(args.piece), int(args.target), move)
        if new_layout:
            write_board(args.filename, new_layout, move_num)
        else:
            print("Invalid jump")

    else:
        parser.print_help()
