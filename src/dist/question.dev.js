"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Question =
/*#__PURE__*/
function () {
  function Question(question) {
    _classCallCheck(this, Question);

    this.text = question.text;
    this.pic = question.attributes.pic;
    this.answer = question.attributes.answer;
    this.difficulty = question.attributes.difficulty;
  }

  _createClass(Question, [{
    key: "renderQuestion",
    // (function(q) {
    //     let i = 0;
    //     do {
    //         i += 1;
    //     } while (i < 5);
    //     const randomIndex = q[Math.floor(Math.random() * q.length)];
    //     questions.push(new Question(q[randomIndex]));
    // });
    value: function renderQuestion(question) {
      console.log(question);
      var p = document.createElement('p');
      p.innerText = question.attributes.text;
      var li = document.createElement('li');
      li.dataset.id = question.id;
      li.append(p, a1, a2, a3, a4);
      questionList.appendChild(li);
    }
  }], [{
    key: "renderQuestions",
    value: function renderQuestions(questions) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var question = _step.value;
          Question.renderQuestion();
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
    key: "fetchQuestions",
    value: function fetchQuestions() {
      var _this = this;

      fetch(questionsURL).then(function (res) {
        return res.json();
      }).then(function (questions) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = questions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var question = _step2.value;
            var newQuestion = new Question(question.data);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        _this.renderQuestions(questions);
      });
    }
  }]);

  return Question;
}();