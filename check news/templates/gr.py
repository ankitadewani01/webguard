import matplotlib.pyplot as plt

# Fake Website Detection Data
websites = ["Website 1", "Website 2", "Website 3", "Website 4"]
fake_website_results = [0.2, 0.9, 0.85, 0.15]  # Assume these are length differences

# Plotting Fake Website Detection Graph
plt.figure(figsize=(10, 6))
colors = ['#8A2BE2' if result > 0.5 else '#00CED1' for result in fake_website_results]
bars = plt.bar(websites, fake_website_results, color=colors)
plt.xlabel('Websites')
plt.ylabel('Length Difference (Scale: 0-1)')
plt.title('Fake Website Detection Results')
plt.ylim(0, 1)
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Adding annotations
for bar, result in zip(bars, fake_website_results):
    height = bar.get_height()
    label = 'True' if result > 0.5 else 'False'
    plt.text(bar.get_x() + bar.get_width() / 2.0, height - 0.05, f'{label}\n{height:.2f}', 
             ha='center', va='bottom' if result > 0.5 else 'top', color='black')

plt.show()
