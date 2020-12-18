"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Answer =
/*#__PURE__*/
function () {
  _createClass(Answer, [{
    key: "renderAnswer",
    value: function renderAnswer(answer) {
      console.log(answer);
      var p = document.createElement('p');
      p.innerText = answer.attributes.text;
      var li = document.createElement('li');
      li.dataset.id = answer.id;
    }
  }], [{
    key: "renderAnswers",
    value: function renderAnswers(answers) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = answers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var answer = _step.value;
          renderAnswer(answer);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "fetchAnswers",
    value: function fetchAnswers() {
      fetch(answersURL).then(function (res) {
        return res.json();
      }).then(function (a) {
        var i = 0;

        do {
          i += 1;
        } while (i < 3);

        var randomAnsIndex = a[Math.floor(Math.random() * a.length)];
        answers.push(new Answer(a[randomAnsIndex]));
      });
      console.log(answers);
    }
  }]);

  function Answer(text, correct) {
    _classCallCheck(this, Answer);

    this.text = text;
    this.correct = correct;
    this.question_id = this.question_id;
  }

  return Answer;
}();