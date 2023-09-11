
// eslint-disable-next-line react/prop-types
export function AnimalList({ animals }) {
	console.log("animals:", animals);

	return (
		<section className="animal-list-container">
			<div>

				<table>
					
					<tbody> 
						<th> Rare Animals</th>
						{
						animals.map(animal => (
							<tr key={animal.type}>
								<td>{animal.type}</td>
								<td>{animal.count}</td>
								<td>
									<a href={"https://www.google.com/search?q=" + animal.type}> Search </a>
								</td>
								<td></td>
							</tr>
						)
						)
						}
					</tbody>
				</table>
			</div>
		</section>
	);
}
