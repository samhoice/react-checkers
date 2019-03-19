from django.test import TestCase
import pytest

from .checkers import Checkers

# Create your tests here.
@pytest.fixture
def start_position():
    return Checkers.base_layout

@pytest.fixture
def sparse_layout():
    return "b    b       B  W          w    "

@pytest.fixture
def jump_layout():
    return "     b   W   B  W          w    "

def test_moves(sparse_layout):
    assert(Checkers.getLegalMoves(0, sparse_layout)['moves'] == [4])
    assert(Checkers.getLegalMoves(5, sparse_layout)['moves'] == [9, 10])
    assert(Checkers.getLegalMoves(13, sparse_layout)['moves'] == [9, 10, 17, 18])
    assert(Checkers.getLegalMoves(16, sparse_layout)['moves'] == [12, 20])
    assert(Checkers.getLegalMoves(27, sparse_layout)['moves'] == [22, 23])

def test_jumps_and_moves(jump_layout):
    res = Checkers.getAllLegalMoves(jump_layout, 0)

    for k in res.keys():
        assert('moves' not in res[k])
        assert('jumps' in res[k])

def test_jumps(jump_layout):
    assert(Checkers.getLegalMoves(5, jump_layout)['jumps'] == [12])
