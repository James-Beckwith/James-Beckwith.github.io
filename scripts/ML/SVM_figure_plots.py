import numpy as np
import matplotlib.pyplot as plt

# set up axes
axs = np.linspace(-50,50,101)
x, y = np.meshgrid(axs, axs)

# define slopes
Sxhigh, Syhigh = (3, 3)
Sxlow, Sylow = (1, 1)
bias = 50

flat = x*0
slopePlaneLowPos = Sxlow*x + Sylow*y + bias
slopePlaneLowNeg = slopePlaneLowPos - 2*bias

slopePlaneHighPos = Sxhigh*x + Syhigh*y + bias
slopePlaneHighNeg = slopePlaneHighPos - 2*bias

def get2dPlot(axs, Sx, Sy, b):
    some_y = -b/Sy- (Sx/Sy)*axs
    plot_x = []
    plot_y = []
    max_ax = max(axs)
    min_ax = min(axs)
    for i in range(len(some_y)):
        if some_y[i]>min_ax and some_y[i]<max_ax:
            plot_x.append(axs[i])
            plot_y.append(some_y[i])
    return plot_x, plot_y

# Create the figure
fig = plt.figure()
# Add an axes
ax = fig.add_subplot(111,projection='3d')
# ax.view_init(elev=19, azim=-23, roll=0)
ax.view_init(elev=23, azim=-52, roll=0)
# surf = ax.plot_surface(x, y, slopePlaneHighNeg, linewidth=0, antialiased=False, alpha=0.2)
ax.plot_surface(x, y, slopePlaneHighPos, linewidth=0, antialiased=False, alpha=0.2)
# ax.plot_surface(x, y, flat, linewidth=0, antialiased=False, alpha=0.2)
ax.scatter(vals[0],vals[1], vals[2], marker='^')

# overplot the intersection of the planes with the zero plane
plot_x, plot_y = get2dPlot(axs, Sxhigh, Syhigh, bias)
ax.plot(plot_x, plot_y, zs=0, zdir='z', label='Decision boundary margin')
plot_x, plot_y = get2dPlot(axs, Sxhigh, Syhigh, -bias)
ax.plot(plot_x, plot_y, zs=0, zdir='z', label='Decision boundary margin')
plt.title('High slope')
plt.savefig('SVM_high_slope.png')
plt.show()

# Create the figure
fig = plt.figure()
# Add an axes
ax = fig.add_subplot(111,projection='3d')
# ax.view_init(elev=19, azim=-23, roll=0)
ax.view_init(elev=23, azim=-52, roll=0)
surf = ax.plot_surface(x, y, slopePlaneLowNeg, linewidth=0, antialiased=False, alpha=0.2)
ax.plot_surface(x, y, slopePlaneLowPos, linewidth=0, antialiased=False, alpha=0.2)
ax.plot_surface(x, y, flat, linewidth=0, antialiased=False, alpha=0.2)
ax.set_zlim([slopePlaneHighNeg.min(), slopePlaneHighPos.max()])

# overplot the intersection of the planes with the zero plane
plot_x, plot_y = get2dPlot(axs, Sxlow, Sylow, bias)
ax.plot(plot_x, plot_y, zs=0, zdir='z', label='Decision boundary margin')
plot_x, plot_y = get2dPlot(axs, Sxlow, Sylow, -bias)
ax.plot(plot_x, plot_y, zs=0, zdir='z', label='Decision boundary margin')
plt.title('Low slope')
plt.savefig('SVM_low_slope.png')
plt.show()

