import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.metrics import RocCurveDisplay
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
X, y = make_classification(random_state=42, n_samples=1000)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state=0)
clf = SVC(random_state=0).fit(X_train, y_train)
fig, ax = plt.subplots()
RocCurveDisplay.from_estimator(
   clf, X_test, y_test, plot_chance_level=True, ax=ax)
ax.plot([0,0,1],[0,1,1],'-r', label='Perfect model')
ax.set(
    xlabel="1 - Specificity",
    ylabel="Recall",
    title=f"ROC curve",
)
ax.legend()
plt.show()